const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    titleCount: Int
    savedTitles: [ListTitle]
  }
  type Auth {
    token: ID!
    user: User
  }

  type ListTitle {
    titleId: ID
    title: String
    plotOverview: String
    type: String
    poster: String
    runtimeMinutes: String
    genreNames: [String]
    userRating: Float
    criticsRating: Float
    networkNames: [String]
    trailer: String
  }
  input ListTitleInput {
    titleId: ID
    title: String
    plotOverview: String
    type: String
    poster: String
    runtimeMinutes: String
    genreNames: [String]
    userRating: Float
    criticsRating: Float
    networkNames: [String]
    trailer: String
  }
  
  type Query {
    me: User
    titles: [ListTitle]
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveTitle(titleData: ListTitleInput!): User
    removeTitle(titleId: ID!): User
  }

`;

module.exports = typeDefs;
