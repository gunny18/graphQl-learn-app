import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      genre
    }
  }
`;

export const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      name
      age
    }
  }
`;

export const GET_COMPLETE_BOOK_DATA = gql`
  query GetFullBookData($id: ID!) {
    book(id: $id) {
      id
      title
      genre
      author {
        name
        age
        books {
          title
        }
      }
    }
  }
`;
