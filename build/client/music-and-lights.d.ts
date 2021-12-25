import { LitElement } from "lit";
declare type MusicItem = {
    id: number;
    artist: string;
    album: string;
    title: string;
    words: string[];
    file: string;
};
export declare class MusicAndLights extends LitElement {
    private found;
    who: string;
    pattern: string;
    render(): import("lit-html").TemplateResult<1>;
    m2s(music: MusicItem): string;
    private vote;
    private change;
    private search;
    enter(evt: KeyboardEvent): void;
}
export {};
//# sourceMappingURL=music-and-lights.d.ts.map