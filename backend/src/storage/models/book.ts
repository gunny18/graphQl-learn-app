import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
