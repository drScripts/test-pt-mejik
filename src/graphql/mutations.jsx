import { gql } from "@apollo/client";

export const CREATEORDER = gql`
  mutation orderBook($input: CreateOrderInput!) {
    createOrder(input: $input) {
      status
      id
    }
  }
`;
