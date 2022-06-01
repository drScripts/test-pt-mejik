import { gql } from "@apollo/client";

export const DETAILBOOKQUERY = gql`
  query detailBook($id: String!) {
    book(id: $id) {
      id
      name
      cover
      description
      code
      status
      category {
        name
        code
        id
      }
      rack {
        name
        code
        id
      }
      author {
        name
        photo
        biography
        id
      }
    }
  }
`;

export const CHECKBOOKBORROWED = gql`
  query borrows($bookId: String) {
    borrows(where: { book: { id: $bookId } }, orderBy: createdAt_DESC) {
      status
      dateStart
      dueDate
    }
  }
`;

export const GETUSER = gql`
  query getUserCheckHeader($id: String) {
    user(id: $id) {
      id
      role
      firstName
      lastName
      email
    }
  }
`;

export const LISTBOOKQUERY = gql`
  query listBook($or: [BookFilter], $where: BookFilter) {
    books(or: $or, where: $where) {
      name
      cover
      description
      code
      status
      rack {
        name
        code
        id
      }
      author {
        name
        photo
        id
      }
      category {
        name
        code
        id
      }
      id
    }
  }
`;

export const GETORDERSQUERY = gql`
  query getOrders(
    $where: OrderFilter
    $or: [OrderFilter]
    $limit: Int
    $skip: Int
    $orderBy: OrderOrderBy
  ) {
    orders(
      where: $where
      or: $or
      limit: $limit
      skip: $skip
      orderBy: $orderBy
    ) {
      status
      user {
        firstName
        lastName
        id
      }
      book {
        id
        name
      }
      id
      dateStart
      dueDate
    }
  }
`;

export const GETORDER = gql`
  query getOrder($id: String!) {
    order(id: $id) {
      dateStart
      dueDate
      book {
        description
        name
        code
        name
        cover
        status
        rack {
          name
        }
        author {
          name
          photo
        }
        category {
          name
        }
      }
      user {
        firstName
        id
        lastName
        phoneNumber
        email
      }
      status
      id
    }
  }
`;

export const GETAUTORSQUERY = gql`
  query getAuthors {
    authors {
      name
      id
      photo
      biography
    }
  }
`;

export const GETCATEGORIES = gql`
  query {
    categories {
      name
      code
      id
    }
  }
`;

export const GETRACKS = gql`
  query getRacks($or: [RackFilter], $where: RackFilter, $orderBy: RackOrderBy) {
    racks(or: $or, where: $where, orderBy: $orderBy) {
      name
      code
      id
    }
  }
`;
