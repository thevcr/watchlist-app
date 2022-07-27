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
    titleId: String
  }
  input ListTitleInput {
    titleId: String
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
