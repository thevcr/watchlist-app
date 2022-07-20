const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    friends: [User]
  }
  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Show {
    showId: String
    genre: [String]
    title: String
    description: String
    backdrop: String
    type: String
  }
  input ShowInput {
    showId: String
    genre: [String]
    title: String
    description: String
    backdrop: String
    type: String
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveShow(showData: ShowInput!): User
    removeShow(showId: ID!): User
  }

`;

module.exports = typeDefs;
