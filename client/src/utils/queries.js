import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      titleCount
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

export const GET_TITLE = gql`
  {
    titles {
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
`;

