const { X_API_KEY, X_API_HOST,TMDB_API_KEY } = process.env
const options = {
    method: 'GET',

    headers: {
        'X-RapidAPI-Key': X_API_KEY,
        'X-RapidAPI-Host': X_API_HOST
    }
};


module.exports = options;