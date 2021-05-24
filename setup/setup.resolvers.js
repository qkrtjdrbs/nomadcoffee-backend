import { client } from "../client";

export default {
  Query: {
    findUser: async (_, { id }) => {
      const user = await client.user.findFirst({ where: { id } });
      if (!user) {
        throw new Error("User not found.");
      }
      return user;
    },
  },
  Mutation: {
    createUser: async (_, { name }) => {
      await client.user.create({
        data: {
          name,
        },
      });
      return {
        ok: true,
      };
    },
  },
};
