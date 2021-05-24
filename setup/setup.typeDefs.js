import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    name: String!
    createdAt: String!
    updatedAt: String!
  }
  type createUserResult {
    ok: Boolean!
    error: String
  }
  type Query {
    findUser(id: Int!): User
  }
  type Mutation {
    createUser(name: String!): createUserResult!
  }
`;
