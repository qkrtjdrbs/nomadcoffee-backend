import { gql } from "apollo-server";

export default gql`
  type FileList {
    url: [String]
  }
  type Mutation {
    uploadPhoto(files: [Upload]): FileList!
  }
`;
