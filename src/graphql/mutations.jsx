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

export const UPDATEBOOKMUTATE = gql`
  mutation updateBook($id: String!, $input: UpdateBookInput!) {
    updateBook(input: $input, id: $id) {
      name
      cover
      id
    }
  }
`;

export const ADDBOOKMUTATE = gql`
  mutation createBook($input: CreateBookInput!) {
    createBook(input: $input) {
      id
      name
      code
      status
    }
  }
`;

export const DELETEBOOKMUTATE = gql`
  mutation deleteBook($id: String!) {
    deleteBook(id: $id) {
      id
    }
  }
`;

export const UPDATERACK = gql`
  mutation updateRack($input: UpdateRackInput!, $id: String!) {
    updateRack(input: $input, id: $id) {
      id
    }
  }
`;
