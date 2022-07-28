export const fetchTitleDetails = (titleId) => {
    return fetch(
        `https://api.watchmode.com/v1/title/${titleId}/details/?apiKey=bzEhgpPZ4GFs7fZGWdI53MjhKAXyYN5yCSSS04us`
    );
  };
  