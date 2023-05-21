import { addToDate } from '@/utils/dateHelper';
import { RepeatInterval, ReservationStatus } from '@prisma/client';

export const sampleShops = [
  {
    id: 1,
    name: '調布本店',
    address: '〒150-0041 東京都 調布市布田2-30-5 プロミネンスNENOYA103',
    email: 'shop1@gmail.com',
    lineChannelSecret: 'test1-lineChannelSecret',
    lineChannelAccessToken: 'test1-lineChannelAccessToken',
    lineBotBasicId: 'test1-lineBotBasicId',
  },
  {
    id: 2,
    name: '調布店ANNEX店',
    address: '〒182-0024 東京都調布市布田2-28-4橋本ビル102',
    email: 'shop2@gmail.com',
    lineChannelSecret: 'test2-lineChannelSecret',
    lineChannelAccessToken: 'test2-lineChannelAccessToken',
    lineBotBasicId: 'test2-lineBotBasicId',
  },
];

export const sampleTrainers = [
  {
    id: 2,
    name: 'trainer1',
    email: 'trainer1@gmail.com',
    password: 'password',
    image: 'sample.png',
    description: `
    【保有資格】NASM-PES(全米スポーツ医学協会)

    【プロフィール】
    
    前職にて月間セッション数100本、実績のある人気トレーナー。
    
    元々ぽっちゃり体型であり、体形にコンプレックスを感じていたことからトレーニングを開始。少しずつ身体が変化し、最大90kgあった体重から20kgの減量に成功。
    
    しかし、身体の変化以上に健康面や精神面へ与えるトレーニングの魅力を感じトレーナーを目指す。
    
    解剖学、生理学、脳神経科学などを論理的で分かりやすい指導を行う。
    
    【オススメの方】
    
    ・ボディメイク
    
    ・姿勢改善
    
    ・肩こり・腰痛・姿勢改善したい方
    
    ・専門的なトレーニングをご希望の方`,
    googleCalendarId:
      '668c80141fc1e5a42ff33556288c08405e3db562af945a1ef499901d4be1d4e2@group.calendar.google.com',
    disableBookingOnTheDayBefore: false,
    timeSlot: 50,
    shopId: 1,
  },
  {
    id: 3,
    name: 'trainer2',
    email: 'trainer2@gmail.com',
    password: 'password',
    image: 'sample.png',
    description: `
    【保有資格】NASM-PES(全米スポーツ医学協会)

    【プロフィール】
    
    前職にて月間セッション数100本、実績のある人気トレーナー。
    
    元々ぽっちゃり体型であり、体形にコンプレックスを感じていたことからトレーニングを開始。少しずつ身体が変化し、最大90kgあった体重から20kgの減量に成功。
    
    しかし、身体の変化以上に健康面や精神面へ与えるトレーニングの魅力を感じトレーナーを目指す。
    
    解剖学、生理学、脳神経科学などを論理的で分かりやすい指導を行う。
    
    【オススメの方】
    
    ・ボディメイク
    
    ・姿勢改善
    
    ・肩こり・腰痛・姿勢改善したい方
    
    ・専門的なトレーニングをご希望の方`,
    googleCalendarId:
      '668c80141fc1e5a42ff33556288c08405e3db562af945a1ef499901d4be1d4e2@group.calendar.google.com',
    disableBookingOnTheDayBefore: false,
    timeSlot: 50,
    shopId: 2,
  },
  {
    id: 4,
    name: 'trainer3',
    email: 'trainer3@gmail.com',
    password: 'password',
    image: 'sample.png',
    description: `
    【保有資格】NASM-PES(全米スポーツ医学協会)

    【プロフィール】
    
    前職にて月間セッション数100本、実績のある人気トレーナー。
    
    元々ぽっちゃり体型であり、体形にコンプレックスを感じていたことからトレーニングを開始。少しずつ身体が変化し、最大90kgあった体重から20kgの減量に成功。
    
    しかし、身体の変化以上に健康面や精神面へ与えるトレーニングの魅力を感じトレーナーを目指す。
    
    解剖学、生理学、脳神経科学などを論理的で分かりやすい指導を行う。
    
    【オススメの方】
    
    ・ボディメイク
    
    ・姿勢改善
    
    ・肩こり・腰痛・姿勢改善したい方
    
    ・専門的なトレーニングをご希望の方`,
    googleCalendarId:
      '668c80141fc1e5a42ff33556288c08405e3db562af945a1ef499901d4be1d4e2@group.calendar.google.com',
    disableBookingOnTheDayBefore: true,
    timeSlot: 50,
    shopId: 1,
  },
];

export const sampleCustomers = [
  {
    id: 5,
    email: 'kazu4101719@gmail.com',
    password: 'password',
    name: 'Customer 1',
    status: 'registered',
    tempEmail: 'kazu4101719@gmail.com',
    tel: '000-0000-0000',
    purpose: 'bodyMake',
    age: '10代',
    sex: 'male',
    remarks: `腰が慢性的に痛いです。
ゆっくりトレーニングしたいです`,
    lineUserId: '',
  },
];

const startReservationDate = addToDate(new Date(), { date: 7 });
startReservationDate.setHours(10, 0, 0);
const endReservationDate = addToDate(startReservationDate, {
  minutes: sampleTrainers[0].timeSlot,
});
export const provisionalReservationSchedule1 = {
  id: 1,
  startDateTime: startReservationDate,
  endDateTime: endReservationDate,
  repeatInterval: null as RepeatInterval | null,
  reservation: {
    id: 1,
    status: 'provisional' as ReservationStatus,
    trainerId: sampleTrainers[0].id,
    customerId: null,
    lockedUntil: addToDate(new Date(), {
      month: 100,
    }),
  },
};
export const provisionalReservationSchedule2 = {
  id: 2,
  startDateTime: addToDate(startReservationDate, { hour: 1 }),
  endDateTime: addToDate(endReservationDate, { hour: 1 }),
  repeatInterval: null as RepeatInterval | null,
  reservation: {
    id: 2,
    status: 'provisional' as ReservationStatus,
    trainerId: sampleTrainers[0].id,
    customerId: null,
    lockedUntil: addToDate(new Date(), {
      month: 100,
    }),
  },
};
export const fixedReservationSchedule1 = {
  id: 3,
  startDateTime: addToDate(startReservationDate, { date: 1 }),
  endDateTime: addToDate(endReservationDate, { date: 1 }),
  repeatInterval: null as RepeatInterval | null,
  reservation: {
    id: 3,
    status: 'fixed' as ReservationStatus,
    trainerId: sampleTrainers[0].id,
    customerId: sampleCustomers[0].id,
    lockedUntil: null,
  },
};
export const fixedReservationSchedule2 = {
  id: 4,
  startDateTime: addToDate(new Date(), { hour: 1 }),
  endDateTime: addToDate(new Date(), { hour: 1, minutes: 50 }),
  repeatInterval: null as RepeatInterval | null,
  reservation: {
    id: 4,
    status: 'fixed' as ReservationStatus,
    trainerId: sampleTrainers[0].id,
    customerId: sampleCustomers[0].id,
    lockedUntil: null,
  },
};
export const fixedReservationSchedule3 = {
  id: 5,
  startDateTime: addToDate(new Date(), { hour: 1 }),
  endDateTime: addToDate(new Date(), { hour: 1, minutes: 50 }),
  repeatInterval: null as RepeatInterval | null,
  reservation: {
    id: 5,
    status: 'fixed' as ReservationStatus,
    trainerId: sampleTrainers[1].id,
    customerId: sampleCustomers[0].id,
    lockedUntil: null,
  },
};
export const sampleReservationSchedules = [
  provisionalReservationSchedule1,
  provisionalReservationSchedule2,
  fixedReservationSchedule1,
  fixedReservationSchedule2,
  fixedReservationSchedule3,
];

const startCustomEventDate = addToDate(new Date(), { date: 7 });
startCustomEventDate.setHours(12, 0, 0);
const endCustomEventDate = addToDate(startCustomEventDate, {
  minutes: sampleTrainers[0].timeSlot,
});
export const sampleCustomEvents = [
  {
    id: 6,
    startDateTime: startCustomEventDate,
    endDateTime: endCustomEventDate,
    repeatInterval: null,
    customEvent: {
      id: 6,
      title: 'サンプル予定',
      detail: '詳細詳細詳細詳細',
      trainerId: sampleTrainers[0].id,
    },
  },
  {
    id: 7,
    startDateTime: addToDate(startCustomEventDate, { hour: 1 }),
    endDateTime: addToDate(endCustomEventDate, { hour: 1 }),
    repeatInterval: 'daily' as RepeatInterval,
    customEvent: {
      id: 7,
      title: 'サンプル予定(毎日)',
      detail: '詳細詳細詳細詳細',
      trainerId: sampleTrainers[0].id,
    },
  },
  {
    id: 8,
    startDateTime: addToDate(startCustomEventDate, { hour: 2 }),
    endDateTime: addToDate(endCustomEventDate, { hour: 2 }),
    repeatInterval: 'weekly' as RepeatInterval,
    customEvent: {
      id: 8,
      title: 'サンプル予定(毎週)',
      detail: '詳細詳細詳細詳細',
      trainerId: sampleTrainers[0].id,
    },
  },
];
