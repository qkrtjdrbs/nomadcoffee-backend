import { client } from "../../client";

export default {
  Query: {
    searchUsers: (_, { keyword, lastId }) =>
      client.user.findMany({
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
      }),
  },
};
