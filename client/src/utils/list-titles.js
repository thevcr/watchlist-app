// Util api function for list titles - takes genre id, source, type
const ListTitles = async (genres, source, type) => {
    let url = `https://api.watchmode.com/v1/list-titles/?apiKey=3NIdl37WmmKuolyvr035ERkCNnMLGTjXsYHFg8GE&source_types=${source}&genres=${genres}=&types=${type}`;    
    const response = await fetch(url, { method: 'Get' })
    .then((res) => res.json())
    .then((json) => {
        console.log(json);
    });
    return response;
};
export default ListTitles;