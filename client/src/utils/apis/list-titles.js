export const fetchListTitles = (sources, genres, types) => {
    return fetch(
        `https://api.watchmode.com/v1/list-titles/?apiKey=bzEhgpPZ4GFs7fZGWdI53MjhKAXyYN5yCSSS04us&source_ids=${sources}&genres=${genres}&types=${types}&limit=5`
    );
  };
  