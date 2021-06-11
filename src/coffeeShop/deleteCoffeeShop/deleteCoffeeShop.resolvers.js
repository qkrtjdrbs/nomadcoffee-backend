import { client } from "../../client";
import { protectedResolver } from "../../user/user.utils";

export default {
  Mutation: {
    deleteCoffeeShop: protectedResolver(async (_, { id }) => {
      try {
        const photos = await client.coffeeShopPhoto.findMany({
          where: {
            coffeeShopId: id,
          },
        });
        if (photos) {
          photos.map(
            async (photo) =>
              await client.coffeeShopPhoto.delete({ where: { id: photo.id } })
          );
        }
        await client.coffeeShop.delete({
          where: {
            id,
          },
        });
      } catch (e) {
        return {
          ok: false,
          error: e.message,
        };
      }
      return {
        ok: true,
      };
    }),
  },
};
