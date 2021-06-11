import { client } from "../../client";
import { protectedResolver } from "../../user/user.utils";
import { uploadFile } from "../../utils";
import { splitCategory } from "../coffeeShop.utils";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, files, categories },
        { loggedInUser }
      ) => {
        let categoryObjs = null;
        if (categories) {
          categoryObjs = splitCategory(categories);
        }
        const newCoffeeShop = await client.coffeeShop.create({
          data: {
            name,
            latitude,
            longitude,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(categoryObjs?.length > 0 && {
              categories: {
                connectOrCreate: categoryObjs,
              },
            }),
          },
        });
        //files coffeeShopPhoto로 upload.
        //connect는 newCoffeeShop's id to coffeeShopId
        files?.forEach(async (file) => {
          const newFile = await uploadFile(file, loggedInUser.id);
          await client.coffeeShopPhoto.create({
            data: {
              url: newFile,
              shop: {
                connect: {
                  id: newCoffeeShop.id,
                },
              },
            },
          });
        });
        return newCoffeeShop;
      }
    ),
  },
};
