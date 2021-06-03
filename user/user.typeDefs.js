import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    password: String!
    name: String!
    location: String
    avatarURL: String
    gitHubUsername: String
    followers(lastId: Int): [User]
    following(lastId: Int): [User]
    totalFollowers: Int!
    totalFollowing: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
