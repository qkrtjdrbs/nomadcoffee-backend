import bcrypt from "bcrypt";
import { client } from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, location, password, avatarURL, githubUsername }
    ) => {
      try {
        const isExist = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        });
        if (isExist) {
          throw new Error("Username or Email already exists.");
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
          error: "Can't create Account.",
        };
      }
    },
  },
};
