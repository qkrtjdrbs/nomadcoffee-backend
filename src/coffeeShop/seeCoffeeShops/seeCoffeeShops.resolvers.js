import { client } from "../../client";

export default {
  Query: {
    seeCoffeeShops: (_, { offset }) =>
      client.coffeeShop.findMany({
        take: 20,
        skip: offset,
        orderBy: {
          createdAt: "desc",
        },
      }),
  },
};
