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

export const ADDRACK = gql`
  mutation addRack($input: CreateRackInput!) {
    createRack(input: $input) {
      id
    }
  }
`;

export const DELETERACK = gql`
  mutation deleteRack($id: String!) {
    deleteRack(id: $id) {
      id
    }
  }
`;

export const UPDATECATEGORY = gql`
  mutation updateCategory($id: String!, $input: UpdateCategoryInput!) {
    updateCategory(input: $input, id: $id) {
      id
    }
  }
`;

export const ADDCATEGORY = gql`
  mutation createCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      code
      name
    }
  }
`;

export const DELETECATEGORY = gql`
  mutation deleteCategory($id: String!) {
    deleteCategory(id: $id) {
      id
      name
      code
    }
  }
`;

export const CREATEBORROW = gql`
  mutation borrowBook($input: CreateBorrowInput!) {
    createBorrow(input: $input) {
      status
      id
    }
  }
`;

export const UPDATEORDER = gql`
  mutation updateOrder($id: String!, $input: UpdateOrderInput!) {
    updateOrder(input: $input, id: $id) {
      id
      status
    }
  }
`;
