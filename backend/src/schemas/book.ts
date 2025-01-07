import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { AUTHORS, BOOKS } from "./mockData";
import Author from "../storage/models/author";
import Book from "../storage/models/book";

const BookType: GraphQLObjectType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      async resolve(parent, args) {
        // const author = AUTHORS.find((a) => a.id === parent.authorID);
        const author = await Author.findById(parent.authorId);
        if (!author) return null;
        return author;
      },
    },
  }),
});

const AuthorType: GraphQLObjectType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        // const books = BOOKS.filter((b) => b.authorID === parent.id);
        const books = await Book.find({ authorId: parent.id });
        return books;
      },
    },
  }),
});

export { BookType, AuthorType };
