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
  # type Genre {
  #   _id: ID,
  #   genre: String
  # }
  type ListTitle {
    titleId: String
    titles: [String]
    limit: Int
  }
  input ListTitleInput {
    titleId: String
    titles: [String]
    limit: Int
  }
  # type TitleDetails {
  #   titleId: String
  #   title: String
  #   plotOverview: String
  #   type: String
  #   runtimeMinutes: Int
  #   genreNames: [String]
  #   userRating: Int
  #   criticScore: Int
  #   originalLanguage: String
  #   networkNames: [String]
  #   trailer: String
  #   sources: [String]
  # }
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
