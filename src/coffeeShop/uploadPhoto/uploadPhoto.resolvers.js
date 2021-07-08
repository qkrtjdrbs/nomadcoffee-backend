import { protectedResolver } from "../../user/user.utils";
import { uploadFile } from "../../utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(async (_, { files }, { loggedInUser }) => {
      const newFiles = files.map(
        async (file) => await uploadFile(file, loggedInUser.id)
      );
      return {
        url: newFiles,
      };
    }),
  },
};
