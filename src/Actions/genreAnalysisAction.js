export const setCurrentGenre = (genreIndex) => {
    return {
        type: "SET_CURRENT_GENRE",
        index: genreIndex 
    };
};

export const setTopGenres = (genres, topArtists, counts) => {

    // items is going to be an array ob json objects that map each genre to its top artists

    let items = [];

    for (let i = 0; i < genres.length; i++) {
        const genreName = genres[i].genreName;
        let topGenreArtists = [];

        for (let j = 0; j < topArtists.length; j++) {

            const genres = topArtists[j].genres;
            const name = topArtists[j].artist;

            for (let k = 0; k < genres.length; k++) {
                
                if (genres[k].toLowerCase() == genreName.toLowerCase()) {
                    topGenreArtists.push(topArtists[j]);
                }
            }

            if (topGenreArtists.length > 3) {
                break;
            }

        }

        let count = 0;
        for (let j = 0; j < counts.length; j++) {
            if (counts[j].name.toLowerCase() == genreName.toLowerCase()) {
                count = counts[j].count;
                break;
            }
        }

        items.push(
            { ...genres[i], "topArtists": topGenreArtists, "count": count}
        )

    }

    return {
        type: "SET_TOP_GENRES",
        items: items 
    };
};