const { gql } = require("apollo-server-express");

// type title description authorName language price quantity status
const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
    myProfile: User
    getallProducts: [Product]
  }
  type Product {
    name: String
    description: String
    price: Int
    images: [String]
    category: ID
  }
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
  }
  type Token {
    token: String
  }
  type SignInUser {
    token: String
    user: User
  }
  type Mutation {
    signUpUser(userNew: UserInput!): Token
    signInUser(userSignIn: UserSignInInput!): SignInUser
    addCategory(name: String!): String
    addProducts(newProduct: newProductInput): String
  }
  input newProductInput {
    name: String!
    description: String!
    price: Int!
    images: [String]!
    category: ID!
  }
  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  input UserSignInInput {
    email: String!
    password: String!
  }
`;

module.exports = typeDefs;
