import { gql } from "@apollo/client";

export const CREATEORDER = gql`
  mutation orderBook($input: CreateOrderInput!) {
    createOrder(input: $input) {
      status
      id
    }
  }
`;

export const LOGINQUERY = gql`
  mutation login($input: LoginInput) {
    login(input: $input) {
      user {
        id
        role
        firstName
        lastName
        email
      }
      token
    }
  }
`;

export const REGISTERQUERY = gql`
  mutation register($input: RegisterInput) {
    register(input: $input) {
      token
      user {
        id
        role
        firstName
        lastName
        email
      }
    }
  }
`;
