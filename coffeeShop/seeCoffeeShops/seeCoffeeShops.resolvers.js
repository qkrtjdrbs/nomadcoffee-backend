import { client } from "../../client";

export default {
  Query: {
    seeCoffeeShops: (_, { lastId }) =>
      client.coffeeShop.findMany({
        skip: lastId ? 1 : 0,
        take: 5,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};
