export const fetchListTitles = (sources, genres, types) => {
    return fetch(
        `https://api.watchmode.com/v1/list-titles/?apiKey=5nZyqpvJWGqV4CpMBVHkdfj36cAQD20UjZ4DIk6l&source_ids=${sources}&genres=${genres}&types=${types}&limit=5`
    );
  };
  