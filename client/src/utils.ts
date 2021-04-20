export function shuffleArray(array: any[]) {
    const arr = Array.from(array);

    for (let i = 0; i < arr.length; i++) {
        // Generating a random index between 0 to i
        const j = Math.floor(Math.random() * (i + 1));

        // replacing the randomly picked index with current index of arr
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}