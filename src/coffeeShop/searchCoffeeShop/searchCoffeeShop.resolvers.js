import { client } from "../../client";

export default {
  Query: {
    searchCoffeeShop: (_, { keyword }) =>
      client.coffeeShop.findMany({
        where: {
          OR: [
            {
              name: {
                contains: keyword.toLowerCase(),
              },
            },
            {
              categories: {
                some: {
                  name: {
                    contains: keyword.toLowerCase(),
                  },
                },
              },
            },
          ],
        },
      }),
  },
};
