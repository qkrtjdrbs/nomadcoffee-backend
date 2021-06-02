import { client } from "../client";

export default {
  Category: {
    totalShops: ({ id }) =>
      client.coffeeShop.count({
        where: {
          categories: {
            some: {
              id,
            },
          },
        },
      }),
  },
  CoffeeShop: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    photos: ({ id }) =>
      client.coffeeShopPhoto.findMany({
        where: {
          shop: {
            id,
          },
        },
      }),
    categories: ({ id }) =>
      client.category.findMany({
        where: {
          shops: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
