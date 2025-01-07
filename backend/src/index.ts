import { config } from "dotenv";
import { join } from "node:path";
config({ path: join(__dirname, "..", ".env") });

import express from "express";
import cors from "cors";
import { createHandler } from "graphql-http/lib/use/express";
import schema from "./schemas";
import { connectDB } from "./storage/connection";

const PORT = process.env.PORT || 3000;

async function initApp() {
  await connectDB();

  const app = express();

  app.use(cors());

  // supercharged endpoint and entrypoint for any graphQL query!
  app.use("/graphql", createHandler({ schema }));

  app.listen(PORT, () => console.log("Listening on", PORT));
}

initApp();
