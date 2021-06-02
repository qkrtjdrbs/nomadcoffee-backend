import { client } from "../../client";
import { protectedResolver } from "../../user/user.utils";
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
        files.forEach(async (file) => {
          //추후 s3 업로드해서 각 파일마다 url 생성 예정
          await client.coffeeShopPhoto.create({
            data: {
              url: file,
              shop: {
                connect: {
                  id: loggedInUser.id,
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
