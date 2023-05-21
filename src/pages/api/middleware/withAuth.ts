import { NextApiRequest, NextApiResponse } from 'next';

export function withAuth(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
  options?: {
    checkEmailVerified?: boolean;
    // userType?: UserType;
  }
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    //   try {
    //     const firebaseAuthUser = await UserRepository.getLoginFirebaseAuthUser(
    //       req
    //     );
    //     if (!firebaseAuthUser) {
    //       return resError(res, 401, '未登録のユーザーです');
    //     }
    //     // Check email verification completed
    //     if (options?.checkEmailVerified && !firebaseAuthUser.email_verified) {
    //       return resError(res, 401, '本登録が完了していません');
    //     }
    //     // Check user data
    //     const userData = await prisma.user.findUnique({
    //       where: {
    //         firebaseUid: firebaseAuthUser.uid,
    //       },
    //     });
    //     if (!userData) {
    //       return resError(res, 401, '本登録が完了していません');
    //     }
    //     // Check user type
    //     if (options?.userType) {
    //       if (
    //         (options.userType === 'customer' && !userData.type) ||
    //         (options.userType === 'admin' && !userData.type)
    //       ) {
    //         return resError(res, 401, 'ログイン中のユーザーでは利用できません:');
    //       }
    //     }
    //   } catch (error) {
    //     return resError(res, 401, error as string);
    //   }
    //   return handler(req, res);
  };
}
