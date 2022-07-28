export const fetchTitleDetails = (titleId) => {
    return fetch(
        `https://api.watchmode.com/v1/title/${titleId}/details/?apiKey=X2hnuJI9waQggvjnLIG4Z7q6JPK68Z9NRZdE0sNP`
    );
  };
  