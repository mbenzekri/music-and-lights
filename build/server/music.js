import { conf } from "./app";
import { fstree } from "./tools";
import { strtools } from "./strtools";
import { Lame } from "node-lame";
import { default as Speaker } from "speaker";
import stream from "stream";
const MAP = new Map();
const FILES = [];
class Music {
    list(limit, pattern) {
        var _a;
        if (!pattern)
            return FILES.slice(0, limit);
        const words = strtools.cleanPrefix(pattern);
        const prefixes = words.map(s => s.substring(0, 3));
        let found = null;
        for (const prefix of prefixes) {
            // on recherche les items contenant tout les mots recherchés
            const bucket = (_a = MAP.get(prefix)) === null || _a === void 0 ? void 0 : _a.filter(item => words.every(ws => item.words.some(wf => wf.startsWith(ws))));
            if (bucket && bucket.length) {
                let intersect = new Set();
                if (found) {
                    for (let i = 0; i < bucket.length && i < limit; i++) {
                        const item = bucket[i];
                        if (found.has(item))
                            intersect.add(item);
                    }
                }
                else {
                    intersect = new Set(bucket.slice(0, limit));
                }
                found = intersect;
            }
        }
        return found ? Array.from(found) : [];
    }
    add(artist, album, title, file) {
        const words = strtools.cleanPrefix(`${artist} ${album} ${title}`);
        const prefixes = words.map(s => s.substring(0, 3));
        const item = { id: FILES.length, artist, album, title, words, file };
        FILES.push(item);
        for (const prefix of prefixes) {
            const bucket = MAP.get(prefix);
            bucket ? bucket.push(item) : MAP.set(prefix, [item]);
        }
    }
    async play(id) {
        try {
            if (id >= 0 && id < FILES.length) {
                const music = FILES[id];
                this.current = music;
                const decoder = new Lame({
                    output: "buffer",
                }).setFile(music.file);
                const buffer = await decoder.decode().then(() => decoder.getBuffer());
                this.speaker = new Speaker();
                const bstream = new stream.PassThrough();
                bstream.end(buffer);
                bstream.pipe(this.speaker);
            }
            else
                throw Error(`server music id = ${id} not found`);
        }
        catch (e) {
            console.log(`server music id = ${id} unable to play`);
        }
    }
}
export const music = new Music();
fstree(conf.musicRoot, /\.mp3$/)
    .then(res => {
    let bad = 0;
    for (const name of res) {
        const items = name.substring(conf.musicRoot.length + 1).split('/');
        switch (items.length) {
            case 2:
                music.add(items[0], "", items[1].replace(/.mp3$/, ''), name);
                break;
            case 3:
                music.add(items[0], items[1], items[2].replace(/.mp3$/, ''), name);
                break;
            default:
                bad++;
            //console.warn(`music path incorrect: ${name}`)
        }
    }
    if (bad > 0)
        console.warn(`found ${bad} music path incorrect`);
})
    .catch(err => console.debug(`fstree walk failed due to : ${String(err)}`));
//# sourceMappingURL=music.js.map