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
