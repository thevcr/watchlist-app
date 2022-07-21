import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_TITLE = gql`
  mutation saveTitle($titleData: ListTitleInput!) {
    saveTitle(titleData: $titleData) {
        titleId
        title
        plotOverview
        type
        runtimeMinutes
        genreNames
        userRating
        criticScore
        originalLanguage
        networkNames
        trailer
        sources
    }
  }
`;

export const REMOVE_TITLE = gql`
  mutation removeTitle($titleId: ID!) {
    removeTitle(titleId: $titleId) {
      titleId
      title
      plotOverview
      type
      runtimeMinutes
      genreNames
      userRating
      criticScore
      originalLanguage
      networkNames
      trailer
      sources
    }
  }
`;