export const fetchTitleDetails = (titleId) => {
    return fetch(
        `https://api.watchmode.com/v1/title/${titleId}/details/?apiKey=${process.env.REACT_APP_WATCHMODE_KEY}`
    );
  };
  