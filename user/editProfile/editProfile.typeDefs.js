import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editProfile(
      name: String
      location: String
      password: String
      avatarURL: Upload
      gitHubUsername: String
    ): MutationResult!
  }
`;
