export const fetchTitleDetails = (titleId) => {
    return fetch(
        `https://api.watchmode.com/v1/title/${titleId}/details/?apiKey=54BD2C8NTMcdfjYt6cg8IwgYnUeiojg3Ogo5i4mR`
    );
  };
  