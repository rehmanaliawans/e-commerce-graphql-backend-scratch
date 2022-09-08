/** @format */

const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
//Database Connection
dotenv.config({
  path: "./config.env",
});
const URL = process.env.MONOG_URL;

//MiddleWare
const context = ({ req }) => {
  const { authorization } = req.headers;
  if (authorization) {
    const { userId } = jwt.verify(authorization, "graphqlsecret");
    return { userId };
  }
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

mongoose
  .connect(URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("mongoose connected");
    return apolloServer.listen({ port: 4000 });
  })
  .then((res) => {
    console.log("server running on ", res.url);
  });
