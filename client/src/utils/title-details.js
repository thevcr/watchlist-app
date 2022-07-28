export const fetchTitleDetails = (titleId) => {
    return fetch(
        `https://api.watchmode.com/v1/title/${titleId}/details/?apiKey=5nZyqpvJWGqV4CpMBVHkdfj36cAQD20UjZ4DIk6l`
    );
  };
  