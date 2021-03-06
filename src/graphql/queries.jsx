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
  query listBook($or: [BookFilter], $where: BookFilter, $limit: Int) {
    books(or: $or, where: $where, limit: $limit) {
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
        id
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
  query getCategories(
    $or: [CategoryFilter]
    $where: CategoryFilter
    $orderBy: CategoryOrderBy
    $limit: Int
  ) {
    categories(or: $or, where: $where, orderBy: $orderBy, limit: $limit) {
      name
      code
      id
    }
  }
`;

export const GETRACKS = gql`
  query getRacks(
    $or: [RackFilter]
    $where: RackFilter
    $orderBy: RackOrderBy
    $limit: Int
  ) {
    racks(or: $or, where: $where, orderBy: $orderBy, limit: $limit) {
      name
      code
      id
    }
  }
`;

export const GETRACK = gql`
  query getRack($id: String!) {
    rack(id: $id) {
      name
      code
      id
    }
  }
`;

export const GETCATEGORY = gql`
  query getCategory($id: String!) {
    category(id: $id) {
      name
      code
      id
    }
  }
`;

export const GETBORROWS = gql`
  query borrows(
    $where: BorrowFilter
    $or: [BorrowFilter]
    $orderBy: BorrowOrderBy
    $limit: Int
  ) {
    borrows(where: $where, or: $or, orderBy: $orderBy, limit: $limit) {
      status
      id
      dateStart
      dueDate
      returnDate
      pinaltyDays
      penalties
      user {
        id
        firstName
        lastName
      }
      book {
        name
        cover
        id
      }
    }
  }
`;

export const GETBORROW = gql`
  query borrow($id: String!) {
    borrow(id: $id) {
      id
      status
      dateStart
      dueDate
      returnDate
      pinaltyDays
      penalties
      book {
        id
        name
        code
        cover
        description
        status
        category {
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
        rack {
          name
          code
          id
        }
      }
      user {
        id
        firstName
        lastName
        email
        phoneNumber
      }
    }
  }
`;
