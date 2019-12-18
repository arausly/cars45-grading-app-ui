import gql from "graphql-tag";

export const loginMutation = gql`
  mutation loginUser($loginCred: LoginUserInput!) {
    login(input: $loginCred) {
      token
    }
  }
`;
