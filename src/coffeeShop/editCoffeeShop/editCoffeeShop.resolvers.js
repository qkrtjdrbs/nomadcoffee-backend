import { client } from "../../client";
import { protectedResolver } from "../../user/user.utils";
import { splitCategory } from "../coffeeShop.utils";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, longitude, categories },
        { loggedInUser }
      ) => {
        const oldCoffeeShop = await client.coffeeShop.findFirst({
          where: { id, userId: loggedInUser.id },
          include: {
            categories: {
              select: {
                slug: true,
              },
            },
          },
        });
        if (!oldCoffeeShop) {
          return {
            ok: false,
            error: "CoffeeShop not found.",
          };
        }
        let categoryObjs = null;
        if (categories) categoryObjs = splitCategory(categories);

        await client.coffeeShop.update({
          where: {
            id,
          },
          data: {
            name,
            latitude,
            longitude,
            ...(categoryObjs?.length > 0 && {
              categories: {
                disconnect: oldCoffeeShop.categories,
                connectOrCreate: categoryObjs,
              },
            }),
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
