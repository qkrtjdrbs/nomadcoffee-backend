import { gql } from "apollo-server-core";

export default gql`
  type createAccountResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String!
      location: String!
      password: String!
      avatarURL: String
      githubUsername: String
    ): createAccountResult!
  }
`;
