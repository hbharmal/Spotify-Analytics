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