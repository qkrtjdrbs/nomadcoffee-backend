import { createWriteStream } from "fs";
import { protectedResolver } from "../user.utils";
import bycrpt from "bcrypt";
import { client } from "../../client";

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
          const { filename, createReadStream } = await avatarURL;
          const newFileName = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(
            process.cwd() + "/uploads/" + newFileName
          );
          readStream.pipe(writeStream);
          newAvatarURL = `http://localhost:4000/static/${newFileName}`;
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
