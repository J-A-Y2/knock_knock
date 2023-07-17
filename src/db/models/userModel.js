import { db } from "../schemas";

const UserModel = {
  findByEmail: async function (email) {
    const user = await db.findOne({
      where: {
        email: email,
        isDeleted: null,
      },
    });

    return user;
  },
};

export { UserModel };
