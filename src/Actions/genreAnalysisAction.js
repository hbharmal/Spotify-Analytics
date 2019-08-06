export const setCurrentGenre = (genreIndex) => {
    console.log(genreIndex);
    return {
        type: "SET_CURRENT_GENRE",
        index: genreIndex 
    };
};

export const setTopGenres = (genres) => {
    return {
        type: "SET_TOP_GENRES",
        genres: genres 
    };
};

export const setTopArtists = (genres, topArtists) => {

    // items is going to be an array ob json objects that map each genre to its top artists

    let items = [];

    for (let i = 0; i < genres.length; i++) {
        const genreName = genres[i].genreName;
        let topGenreArtists = [];

        for (let j = 0; j < topArtists.length; j++) {

            const genres = topArtists[j].genres;
            const name = topArtists[j].artist;

            for (let k = 0; k < genres.length; k++) {
                
                if (genres[k].toLowerCase() === genreName.toLowerCase()) {
                    topGenreArtists.push(name);
                }
            }

            if (topGenreArtists.length > 3) {
                break;
            }

        }

        items.push(
            { ...genres[i], "topArtists": topGenreArtists}
        )

    }

    return {
        type: "SET_TOP_ARTISTS",
        items: items 
    };
};