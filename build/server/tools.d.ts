export declare class Chrono extends Date {
    private tops;
    constructor();
    start(): void;
    reset(): void;
    log(txt: string): void;
    topset(key: string): number;
    top(key?: string): number;
}
export declare function timed<T>(todo: Promise<T>, timecb: (time: number, result: any) => void): Promise<T>;
export declare function range(end: number, start?: number, step?: number): Generator<number, void, unknown>;
/**
 * flatten an array of array recursively
 * @param v  array or value to flatten
 * @returns an array of one level
 */
export declare function flatten<T>(v: T | Array<T>, arr?: Array<T>): Array<T>;
export declare function fstree(directory: string, include?: RegExp, exclude?: RegExp): Promise<string[]>;
//# sourceMappingURL=tools.d.ts.map