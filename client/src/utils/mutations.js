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
        _id
        username
        email
        savedTitles {
          titleId
          title
          plotOverview
          type
          poster
          runtimeMinutes
          genreNames
          userRating
          criticsRating
          networkNames
          trailer
        }
    }
  }
`;

export const REMOVE_TITLE = gql`
  mutation removeTitle($titleId: ID!) {
    removeTitle(titleId: $titleId) {
      _id
      username
      email
      savedTitles {
        titleId
        title
        plotOverview
        type
        poster
        runtimeMinutes
        genreNames
        userRating
        criticsRating
        networkNames
        trailer
      }
    }
  }
`;