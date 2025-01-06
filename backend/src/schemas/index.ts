import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import BookType from "./book";
import { BOOKS } from "./mockData";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        //code to fetch data from DB/other sources
        const book = BOOKS.find((b) => b.id === args.id);
        if (book) return book;
        return null;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
