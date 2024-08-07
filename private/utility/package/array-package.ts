// * Package Functions * \\
function chunk_array<T>(given_array: T[], chunks: number): T[][] {
    return Array.from({ length: Math.ceil(given_array.length / chunks) }, (_, index) =>
        given_array.slice(index * chunks, (index + 1) * chunks)
    );
}

function flatten_array<T>(given_array: T[][]): T[] {
    return given_array.reduce((acc, val) => acc.concat(val), []);
}

function unique_array<T>(given_array: T[]): T[] {
    return Array.from(new Set(given_array))
}

function shuffle_array<T>(given_array: T[]): T[] {
    const to_be_shuffled = [...given_array];
    for (let i = to_be_shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [to_be_shuffled[i], to_be_shuffled[j]] = [to_be_shuffled[j], to_be_shuffled[i]];
    }
    return to_be_shuffled;
}