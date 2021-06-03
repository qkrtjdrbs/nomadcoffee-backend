import { client } from "../../client";

export default {
  Query: {
    seeCategory: (_, { id, lastId }) =>
      client.coffeeShop.findMany({
        where: {
          categories: {
            some: {
              id,
            },
          },
        },
        skip: lastId ? 1 : 0,
        take: 5,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};
