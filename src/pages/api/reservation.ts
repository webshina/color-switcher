import {
  msgWhenReservationExpired,
  msgWhenReservationTimeout,
  msgWhenReservationWasFilledWithMisplacedAppointments,
} from '@/constants/messages';
import { prisma } from '@/lib/prisma';
import { Sex } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { ReservationSearchResponse } from 'types/Schedule';
import { cors } from './middleware/cors';
import { ReservationRepository } from './repository/ReservationRepository';
import { UserRepository } from './repository/UserRepository';
import { resError, resSuccess } from './utils/responseHelper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { method } = req.query as { method: 'myReservations' | 'getByIds' };
    if (method === 'getByIds') {
      const { ids, onlyLocked } = req.query as {
        ids: string[];
        onlyLocked: string;
      };
      const idsNum = ids.map((id) => Number(id));

      const schedules = await ReservationRepository.getByIds(idsNum);

      if (onlyLocked === 'true') {
        for (const schedule of schedules) {
          if (
            schedule.reservation?.lockedUntil &&
            schedule.reservation.lockedUntil < new Date()
          ) {
            return resError(res, 400, msgWhenReservationTimeout);
          }
        }
      }

      return resSuccess(res, schedules);
    } else if (method === 'myReservations') {
      const loginCustomerUser = await UserRepository.getLoginUser(req);
      if (!loginCustomerUser?.customer) {
        throw 'Customer not found';
      }

      const reservations = await ReservationRepository.getByCustomerId(
        loginCustomerUser.customer.id
      );

      return resSuccess(res, { reservations });
    }
  } else if (req.method === 'POST') {
    const { method } = req.body as {
      method: 'search' | 'provision' | 'fix';
    };

    // Get user if user logged in
    let customerId: number | undefined;
    try {
      const loginCustomer = await UserRepository.getLoginFirebaseAuthUser(req);
      const user = await prisma.user.findUnique({
        where: {
          firebaseUid: loginCustomer.uid,
        },
        include: {
          customer: true,
        },
      });
      if (!user?.customer) {
        throw 'customer not found';
      }
      customerId = user.customer.id;
    } catch (error) {
      customerId = undefined;
    }

    if (method === 'search') {
      // Search time slot and provision
      const {
        shopId,
        isCollectiveReservation,
        dateList,
        dateListForCollectiveReservation,
        trainerId,
      } = req.body as {
        shopId: string;
        isCollectiveReservation: string;
        dateList: string[];
        dateListForCollectiveReservation: string[];
        trainerId: string;
      };
      let isCollectiveReservationBool;
      if (typeof isCollectiveReservation === 'boolean') {
        isCollectiveReservationBool = isCollectiveReservation;
      } else {
        isCollectiveReservationBool = isCollectiveReservation === 'true';
      }
      const result: {
        reservationSearchResponse: ReservationSearchResponse[] | undefined;
        rejectedReservationSearchResponses:
          | ReservationSearchResponse[]
          | undefined;
        recommends: ReservationSearchResponse[] | undefined;
      } = {
        reservationSearchResponse: undefined,
        rejectedReservationSearchResponses: undefined,
        recommends: undefined,
      };

      // Format Date list
      const dateSet = new Set(
        isCollectiveReservationBool
          ? dateListForCollectiveReservation
          : dateList
      );
      const dateListFormatted = Array.from(dateSet).map((date) => {
        return new Date(date);
      });

      const searchResult = await ReservationRepository.search({
        shopId: Number(shopId),
        isCollectiveReservation: isCollectiveReservationBool,
        dateList: dateListFormatted,
        trainerId: Number(trainerId),
      });
      result.reservationSearchResponse =
        searchResult.reservationSearchResponses;
      result.rejectedReservationSearchResponses =
        searchResult.rejectedReservationSearchResponses;

      if (
        !result.reservationSearchResponse ||
        result.reservationSearchResponse.length === 0
      ) {
        result.recommends = await ReservationRepository.searchRecommendation({
          shopId: Number(shopId),
          dateList: dateListFormatted,
          trainerId: Number(trainerId),
        });
      }
      resSuccess(res, result);
    } else if (method === 'provision') {
      const { reservations } = req.body as {
        reservations: ReservationSearchResponse[];
      };
      try {
        const reservationScheduleIds = await ReservationRepository.provision({
          reservations,
        });

        return resSuccess(res, reservationScheduleIds);
      } catch (error) {
        if (error === msgWhenReservationWasFilledWithMisplacedAppointments) {
          resError(
            res,
            400,
            msgWhenReservationWasFilledWithMisplacedAppointments
          );
        }
      }
    } else if (method === 'fix') {
      // Fix reservation
      const {
        reservationIds,
        customerName,
        age,
        sex,
        email,
        tel,
        purpose,
        remarks,
      } = req.body as {
        reservationIds: string[];
        customerName: string;
        age: string;
        sex: string;
        email: string;
        tel: string;
        purpose: string;
        remarks: string;
      };
      const reservationIdsNum = reservationIds.map((id) => Number(id));

      try {
        await ReservationRepository.fix({
          reservationIds: reservationIdsNum,
          loginCustomerId: customerId,
          customer: {
            name: customerName,
            email,
            tel,
            purpose,
            age: age !== '' ? age : undefined,
            sex: sex !== '' ? (sex as Sex) : undefined,
            remarks: remarks !== '' ? remarks : undefined,
          },
        });

        return resSuccess(res);
      } catch (error) {
        if (error === msgWhenReservationExpired) {
          return resError(res, 400, msgWhenReservationExpired);
        }
      }
    }
  } else {
    return resError(res, 405);
  }
};

export default cors(handler);
