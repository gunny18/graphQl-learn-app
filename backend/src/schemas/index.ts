import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { AUTHORS, BOOKS } from "./mockData";
import { AuthorType, BookType } from "./book";
import Author from "../storage/models/author";
import Book from "../storage/models/book";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        //code to fetch data from DB/other sources
        // const book = BOOKS.find((b) => b.id === args.id);
        const book = await Book.findById(args.id);
        if (book) return book;
        return null;
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        // const author = AUTHORS.find((a) => a.id === args.id);
        const author = await Author.findById(args.id);
        if (!author) return null;
        return author;
      },
    },
    books: {
      type: new GraphQLList(BookType),
      async resolve() {
        return await Book.find();
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      async resolve() {
        return await Author.find();
      },
    },
  },
});

const Mutations = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parent, args) {
        const author = new Author({
          name: args.name,
          age: args.age,
        });
        await author.save();
        return author;
      },
    },
    addBook: {
      type: BookType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const book = new Book({
          title: args.title,
          genre: args.genre,
          authorId: args.authorId,
        });
        await book.save();
        return book;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
});

export default schema;
