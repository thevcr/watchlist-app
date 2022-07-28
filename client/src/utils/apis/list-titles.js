export const fetchListTitles = (sources, genres, types) => {
    return fetch(
        `https://api.watchmode.com/v1/list-titles/?apiKey=54BD2C8NTMcdfjYt6cg8IwgYnUeiojg3Ogo5i4mR&source_ids=${sources}&genres=${genres}&types=${types}&limit=10`
    );
  };
  