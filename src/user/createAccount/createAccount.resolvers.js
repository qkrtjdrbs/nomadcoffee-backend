import bcrypt from "bcrypt";
import { client } from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, location, password, avatarURL, githubUsername }
    ) => {
      try {
        const isUsernameExist = await client.user.findFirst({
          where: {
            username,
          },
        });
        const isEmailExist = await client.user.findFirst({
          where: {
            email,
          },
        });
        if (isUsernameExist) {
          throw new Error("Username already exists.");
        }
        if (isEmailExist) {
          throw new Error("Email already exists.");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            username,
            email,
            name,
            location,
            password: hashedPassword,
            avatarURL,
            githubUsername,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};
