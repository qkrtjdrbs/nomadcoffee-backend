import { gql } from "apollo-server-core";

export default gql`
  type loginResult {
    ok: Boolean!
    error: String
    token: String
  }
  type Mutation {
    login(username: String!, password: String!): loginResult!
  }
`;
