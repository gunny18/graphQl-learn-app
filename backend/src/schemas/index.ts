import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { AUTHORS, BOOKS } from "./mockData";
import { AuthorType, BookType } from "./book";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to fetch data from DB/other sources
        const book = BOOKS.find((b) => b.id === args.id);
        if (book) return book;
        return null;
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const author = AUTHORS.find((a) => a.id === args.id);
        if (!author) return null;
        return author;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
