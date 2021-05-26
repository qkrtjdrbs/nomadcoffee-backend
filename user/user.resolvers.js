import { client } from "../client";

export default {
  Query: {
    hello: (_, __) => {
      return "welcome!";
    },
  },
};
