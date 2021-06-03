import { client } from "../../client";

export default {
  Query: {
    seeCategories: (_, { lastId }) =>
      client.category.findMany({
        skip: lastId ? 1 : 0,
        take: 5,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};
