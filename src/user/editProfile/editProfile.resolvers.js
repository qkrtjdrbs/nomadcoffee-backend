import { protectedResolver } from "../user.utils";
import bycrpt from "bcrypt";
import { client } from "../../client";
import { uploadFile } from "../../utils";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { name, location, password, avatarURL, gitHubUsername },
        { loggedInUser }
      ) => {
        let newAvatarURL = null;
        if (avatarURL) {
          newAvatarURL = await uploadFile(avatarURL, loggedInUser.id);
        }
        let uglyPassword = null;
        if (password) {
          uglyPassword = await bycrpt.hash(password, 10);
        }
        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            name,
            location,
            ...(uglyPassword && { password: uglyPassword }),
            ...(newAvatarURL && { avatarURL: newAvatarURL }),
            gitHubUsername,
          },
        });
        if (updatedUser.id) {
          return {
            ok: true,
          };
        }
        return {
          ok: false,
          error: "Fail to update user.",
        };
      }
    ),
  },
};
