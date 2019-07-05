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