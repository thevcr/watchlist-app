export const fetchListTitles = (sources, genres, types) => {
    return fetch(
        `https://api.watchmode.com/v1/list-titles/?apiKey=${process.env.REACT_APP_WATCHMODE_KEY}&source_ids=${sources}&genres=${genres}&types=${types}&limit=10`
    );
  };
  