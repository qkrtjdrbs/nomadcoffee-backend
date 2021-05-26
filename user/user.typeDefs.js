import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    location: String
    password: String!
    avatarURL: String
    gitHubUsername: String
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    hello: String
  }
`;
