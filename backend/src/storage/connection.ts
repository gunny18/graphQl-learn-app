import mongoose from "mongoose";

export const connectDB = async () => {
  const URI = process.env.URI;
  if (!URI) throw new Error("Invalid Mongo URI");
  await mongoose.connect(URI);
  console.log("Connected to DB");
};
