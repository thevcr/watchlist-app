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
  }
`;

export const GET_TITLE = gql`
  {
    titles {
      titleId
      limit
    }
  }
`;

export const GET_TITLEDETAILS = gql`
  {
    titles {
      titleId
      type
      limit
      titles {
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
  }
`;

export const GET_GENRES = gql`
  {
    genres [{
      _id
      name
      }]
  }
`;