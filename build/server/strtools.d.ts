declare class Strtools {
    clean(value: string): string;
    wordList(value: string): string[];
    cleanPrefix(value: string): string[];
    cleanWords(value: string): string;
    fuzzyHash(value: string): number;
    levenshtein(str1: string, str2: string): number;
    fuzzyExtend(fuzzyh: number): number[];
}
export declare const strtools: Strtools;
export {};
//# sourceMappingURL=strtools.d.ts.map