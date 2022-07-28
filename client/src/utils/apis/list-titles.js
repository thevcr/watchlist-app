export const fetchListTitles = (sources, genres, types) => {
    return fetch(
        `https://api.watchmode.com/v1/list-titles/?apiKey=X2hnuJI9waQggvjnLIG4Z7q6JPK68Z9NRZdE0sNP&source_ids=${sources}&genres=${genres}&types=${types}&limit=10`
    );
  };
  