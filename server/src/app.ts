import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bluebird from "bluebird";
import { graphqlExpress } from "apollo-server-express";
import schema from "./schema";

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = process.env.MONGO_URL;
(<any>mongoose).Promise = bluebird;
mongoose.connect(mongoUrl).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  // process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

export default app;
