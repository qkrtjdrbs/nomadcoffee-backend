import { client } from "../../client";

export default {
  Query: {
    seeCoffeeShops: (_, { offset }) =>
      client.coffeeShop.findMany({
        take: 3,
        skip: offset,
      }),
  },
};
