// * Imports * \\
import { performance } from "perf_hooks";
import { Terminal as terminal, terminal as instance } from "terminal-kit";

// * Types * \\ 
type log_level = "warn" | "info" | "success" | "error" | "debug";
type log_function = (header_text: string, core_text: string, ...args: any[]) => void;
type terminal_color = "yellow" | "blue" | "green" | "red" | "magenta" | "gray";

// * Classes * \\
class console_package {
    private start_times: Map<string, number> = new Map();
    private core: terminal;

    constructor(core: terminal) {
        this.core = core;
    };

    // * Private Methods * \\
    private log_with_color(level: log_level, header_text: string, core_text: string, ...args: any[]): void {
        const color_map: Record<log_level, terminal_color> = {
            warn: "yellow",
            info: "blue",
            success: "green",
            error: "red",
            debug: "magenta"
        };

        const got_color = color_map[level];
        const new_timestamp = new Date().toISOString();
        const formatted_args = args.length ? ` ${args.map(arg => JSON.stringify(arg)).join(" ")}` : "";

        this.core[got_color](`[${new_timestamp}] ${header_text} `);
        this.core.defaultColor(`${core_text}${formatted_args}`);
        this.core.gray(` +${performance.now().toFixed(2)}ms\n`);
    };

    // * Package Methods * \\
    warn: log_function = (header_text, core_text, ...args) => this.log_with_color("warn", header_text, core_text, ...args);
    info: log_function = (header_text, core_text, ...args) => this.log_with_color("info", header_text, core_text, ...args);
    success: log_function = (header_text, core_text, ...args) => this.log_with_color("success", header_text, core_text, ...args);
    error: log_function = (header_text, core_text, ...args) => this.log_with_color("error", header_text, core_text, ...args);
    debug: log_function = (header_text, core_text, ...args) => this.log_with_color("debug", header_text, core_text, ...args);

    // * Public Sub Methods * \\
    public time_start(label_text: string): void {
        this.start_times.set(label_text, performance.now());
    }

    public time_end(label_text: string): void {
        const start_time = this.start_times.get(label_text);
        if (start_time === undefined) {
            this.warn("timer", `timer '${label_text}' does not exist`);
            return;
        }

        const new_time = performance.now() - start_time;
        this.info("timer", `${label_text}: ${new_time.toFixed(2)}ms`);

        // ! Dont forget to cleanup lol
        this.start_times.delete(label_text);
    }

    public group_start(title_text: string): void {
        this.core.blue(`┌─ ${title_text}\n`);
    }

    public group_end(): void {
        this.core.blue(`└─\n`);
    }

    public table_create(given_data: any[]): void {
        if (given_data.length === 0) {
            this.warn("table", "no viable data found to display");
        }

        const fetched_headers = Object.keys(given_data[0]);
        const fetched_rows = given_data.map(mapped_item => fetched_headers.map(fetched_header => mapped_item[fetched_header]))

        this.core.table([fetched_headers, ...fetched_rows], {
            hasBorder: true,
            contentHasMarkup: true,
            borderChars: "lightRounded",
            textAttr: { bg_color: "default" }
        })
    }
}

// * Package Export * \\
export default new console_package(instance);