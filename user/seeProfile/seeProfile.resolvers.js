import { client } from "../../client";

export default {
  Query: {
    seeProfile: async (_, { username }) => {
      try {
        const user = await client.user.findUnique({
          where: {
            username,
          },
        });
        if (!user) {
          throw new Error("User not exists.");
        }
        return user;
      } catch (e) {
        return null;
      }
    },
  },
};
