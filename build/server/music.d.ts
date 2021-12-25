declare type MusicItem = {
    id: number;
    artist: string;
    album: string;
    title: string;
    words: string[];
    file: string;
};
declare class Music {
    private current?;
    private encoder?;
    private speaker?;
    list(limit: number, pattern?: string): MusicItem[];
    add(artist: string, album: string, title: string, file: string): void;
    play(id: number): Promise<void>;
}
export declare const music: Music;
export {};
//# sourceMappingURL=music.d.ts.map