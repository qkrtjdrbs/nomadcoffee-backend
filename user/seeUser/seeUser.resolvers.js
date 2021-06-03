import { client } from "../../client";

export default {
  User: {
    followers: async ({ username }, { lastId }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return null;
      }
      const followers = await client.user
        .findUnique({
          where: {
            username,
          },
        })
        .followers({
          skip: lastId ? 1 : 0,
          take: 5,
          ...(lastId && { cursor: { id: lastId } }),
        });
      return followers;
    },
    following: async ({ username }, { lastId }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return null;
      }
      const following = await client.user
        .findUnique({
          where: {
            username,
          },
        })
        .following({
          skip: lastId ? 1 : 0,
          take: 5,
          ...(lastId && { cursor: { id: lastId } }),
        });
      return following;
    },
    totalFollowers: ({ id }) =>
      client.user.count({ where: { following: { some: { id } } } }),
    totalFollowing: ({ id }) =>
      client.user.count({ where: { followers: { some: { id } } } }),
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;
      const exists = await client.user
        .findUnique({ where: { username: loggedInUser.username } })
        .following({ where: { id } });
      return exists.length !== 0;
    },
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;
      return id === loggedInUser.id;
    },
  },
};
