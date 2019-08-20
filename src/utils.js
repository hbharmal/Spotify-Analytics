export function rangeToString(range) {
    switch (range) {
        case 0:
            return "short_term"
        case 1:
            return "medium_term"
        case 2: 
            return "long_term"
        default:
            return "short_term"
    }
}

export function filterGenres(genres) {

    var dict = {
        "alternative": false,
        "anime": false,
        "blues": false,
        "children": false,
        "classical": false,
        "comedy": false,
        "country": false,
        "dance": false,
        "easy listening": false,
        "electronic": false,
        "folk": false,
        "hip hop": false,
        "holiday": false,
        "international": false,
        "jazz": false,
        "rap": false,
        "holiday": false,
        "indie": false,
        "instrumental": false,
        "latin": false,
        "new age": false,
        "opera": false,
        "pop": false,
        "rnb": false,
        "rock": false,
        "trap": false,
        "sleep": false 
    }

    for (let i = 0; i < genres.length; i++) {

        const element = genres[i].toLowerCase();
        if (dict[element] != undefined && dict[element] == false) {
            dict[element] = true
            continue
        } 

        const currentArray = genres[i].split(/[\s,-]+/);

        for (let j = 0; j < currentArray.length; j++) {
            
            const element = currentArray[j].toLowerCase();

            // for electronic music (gives me more reason to implement AI here lol)
            if (element == "electro" || element == "edm") {
                dict["electronic"] = true;
                continue;
            }

            if (dict[element] != undefined && dict[element] == false) {
                dict[element] = true;
            }
        }
    }

    let finalGenres = [];

    Object.keys(dict).forEach(key => {
        if (dict[key]) {
            const prettyValue = key.charAt(0).toUpperCase() + key.slice(1);
            finalGenres.push(prettyValue);
        }
    });

    return finalGenres;

}

export function computeGenrePercentages(allGenres) {

    var dict = {
        "alternative": 0,
        "anime": 0,
        "blues": 0,
        "children": 0,
        "classical": 0,
        "comedy": 0,
        "country": 0,
        "dance": 0,
        "easy listening": 0,
        "electronic": 0,
        "folk": 0,
        "hip hop": 0,
        "holiday": 0,
        "international": 0,
        "jazz": 0,
        "rap": 0,
        "holiday": 0,
        "indie": 0,
        "instrumental": 0,
        "latin": 0,
        "new age": 0,
        "opera": 0,
        "pop": 0,
        "rnb": 0,
        "rock": 0,
        "trap": 0,
        "sleep": 0, 
        "other": 0
    }

    for (let i = 0; i < allGenres.length; i++) {

        const genres = allGenres[i];
        let found = false;

        for (let j = 0; j < genres.length; j++) {
            const element = genres[j].toLowerCase();
            // if the genre is found 
            if (dict[element] != undefined) {
                dict[element]++;
                found = true;
                continue
            } 

            const currentArray = genres[j].split(/[\s,-]+/);

            for (let k = 0; k < currentArray.length; k++) {
            
                const element = currentArray[k].toLowerCase();
    
                // for electronic music (gives me more reason to implement AI here lol)
                if (element == "electro" || element == "edm") {
                    dict["electronic"]++;
                    found = true;
                } else if (dict[element] != undefined) {
                    dict[element]++;
                    found = true 
                }

            }

            if (!found) {
                dict["other"]++;
            }
        }
    }

    const filteredArray = Object.keys(dict).map(key => {
        return {genre: key, count: dict[key]}
    }).filter(object => {
        return object.count > 0
    }).sort( (a, b) => {
        return (a.count > b.count ? 1 : -1);
    });

    return filteredArray;
}

export function reduceFeatures(features) {
    
    const len = features.length; 

    let danceabilityTotal = 0;
    let energyTotal = 0;
    let acousticnessTotal = 0;
    let instrumentalnessTotal = 0;
    let valenceTotal = 0;
    let tempoTotal = 0;
    let durationTotal = 0;
    let modeCounts = {};
    let keyCounts = {};

    for (let i = 0; i < features.length; i++) {
        danceabilityTotal += features[i].danceability;
        energyTotal += features[i].energy;
        acousticnessTotal += features[i].acousticness;
        instrumentalnessTotal += features[i].instrumentalness;
        valenceTotal += features[i].valence;
        tempoTotal += features[i].tempo;
        durationTotal += features[i].duration_ms;

        if (modeCounts[features[i].mode] != undefined) {
            modeCounts[features[i].mode] = modeCounts[features[i].mode] + 1;
        } else {
            modeCounts[features[i].mode] = 1;
        }

        if (keyCounts[features[i].key] != undefined) {
            keyCounts[features[i].key] = keyCounts[features[i].key] + 1;
        } else {
            keyCounts[features[i].key] = 1;
        };

    }

    let maxMode = "";
    let maxModeCount = 0;

    let maxKey = "";
    let maxKeyCount = 0;

    console.log(modeCounts);
    console.log(keyCounts);

    Object.keys(modeCounts).map(key => {
        if (modeCounts[key] >= maxModeCount) {
            maxModeCount = modeCounts[key];
            maxMode = key;
        }
    });

    Object.keys(keyCounts).map(key => {
        if (keyCounts[key] >= maxKeyCount) {
            maxKeyCount = keyCounts[key];
            maxKey = key;
        }
    });

    let reducedFeatures = {
        "danceability": Number(danceabilityTotal / len).toFixed(3),
        "energy": Number(energyTotal / len).toFixed(3),
        "acousticness": Number(acousticnessTotal / len).toFixed(3),
        "instrumentalness": Number(instrumentalnessTotal / len).toFixed(3),
        "valence": Number(valenceTotal / len).toFixed(3), 
        "tempo": Number(tempoTotal / len).toFixed(3),
        "mode": maxMode,
        "key": maxKey,
        "duration": Number(durationTotal / len).toFixed(0)
    };

    return reducedFeatures;

}
