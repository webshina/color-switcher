export const createAdmin = async () => {
  // const email = process.env.ADMIN_EMAIL;
  // if (!email) {
  //   throw 'ADMIN_EMAIL not defined';
  // }
  // // Create Firebase user if not exist
  // let firebaseAuthUser: UserRecord | undefined = undefined;
  // try {
  //   firebaseAuthUser = await firebaseAdminAuth.getUserByEmail(email);
  // } catch (error) {
  //   if (isFirebaseError(error)) {
  //     if (error.code === 'auth/user-not-found') {
  //       firebaseAuthUser = await firebaseAdminAuth.createUser({
  //         email: email,
  //         password: 'nft12345',
  //         emailVerified: true,
  //         displayName: 'Admin',
  //         disabled: false,
  //       });
  //     }
  //   }
  // }
  // // Create DB user if not exist
  // const existingAdminUser = await prisma.user.findMany({
  //   where: {
  //     type: 'admin',
  //   },
  // });
  // if (firebaseAuthUser && existingAdminUser.length === 0) {
  //   await prisma.user.create({
  //     data: {
  //       id: 1,
  //       type: 'admin',
  //       firebaseUid: firebaseAuthUser.uid,
  //       name: 'Administrator',
  //     },
  //   });
  // }
};
