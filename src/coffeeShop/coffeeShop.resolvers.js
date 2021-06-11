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
          coffeeShopId: id,
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
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;
      return userId === loggedInUser.id;
    },
  },
};
