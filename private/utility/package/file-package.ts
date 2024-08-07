// * Imports * \\
import { statSync, readdirSync } from "fs";
import { join } from "path";

// * Types * \\
type file_filter = (file: string) => boolean

// * Package Functions * \\
function recursivly_read_directory(directory_path: string, filter: file_filter): string[] {
    let results: string[] = [];

    function read_directory(current_path: string) {
        const fetched_files = readdirSync(current_path);

        for (const file of fetched_files) {
            const file_path = join(current_path, file);
            const file_stat = statSync(file_path);

            if (file_stat.isDirectory()) {
                read_directory(file_path);
            };

            if (filter(file)) {
                results.push(file_path);
            }
        }
    };

    read_directory(directory_path);
    return results;
}

function file_validity_check(file_path: string): boolean {
    return file_path.endsWith(".ts") || file_path.endsWith(".js");
}

// * Export * \\
export default {
    read_directory: recursivly_read_directory,
    validate_path: file_validity_check
};