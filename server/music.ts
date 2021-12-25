import { conf } from "./app"
import { fstree } from "./tools"
import { strtools } from "./strtools"
import { Lame } from "node-lame"
import { default as Speaker } from "speaker"
import stream, { Transform } from "stream"




const MAP = new Map<string, MusicItem[]>()
const FILES: MusicItem[] = []

type MusicItem = {
    id: number
    artist: string
    album: string
    title: string
    words: string[]
    file: string
}

class Music {
    
    private current?: MusicItem
    private mstream?: Transform
    private speaker?: Speaker

    list(limit: number, pattern?: string): MusicItem[] {
        if (!pattern) return FILES.slice(0, limit)
        const words = strtools.cleanPrefix(pattern)
        const prefixes = words.map(s => s.substring(0, 3))
        let found: Set<MusicItem> | null = null
        for (const prefix of prefixes) {
            // on recherche les items contenant tout les mots recherchés
            const bucket = MAP.get(prefix)?.filter(item => words.every(ws => item.words.some(wf => wf.startsWith(ws))))
            if (bucket && bucket.length) {
                let intersect = new Set<MusicItem>()
                if (found) {
                    for (let i = 0; i < bucket.length && i < limit; i++) {
                        const item = bucket[i]
                        if (found.has(item)) intersect.add(item)
                    }
                } else {
                    intersect = new Set(bucket.slice(0, limit))
                }
                found = intersect
            }
        }
        return found ? Array.from(found) : []
    }
    add(artist: string, album: string, title: string, file: string) {
        const words = strtools.cleanPrefix(`${artist} ${album} ${title}`)
        const prefixes = words.map(s => s.substring(0, 3))
        const item = { id: FILES.length, artist, album, title, words, file }
        FILES.push(item)
        for (const prefix of prefixes) {
            const bucket = MAP.get(prefix)
            bucket ? bucket.push(item) : MAP.set(prefix, [item])
        }
    }
    getById(id: number) {
        return (id >= 0 && id < FILES.length) ? FILES[id] : null
    }
    pause() {
        if (this.mstream) this.mstream.pause()
    }
    resume() {
        if (this.mstream) this.mstream.resume()
    }
    stop() {
        if (this.mstream) this.mstream.destroy()
    }
    async play(id: number) {
        try {
            const music = this.getById(id)
            if (!music) return
            this.current = music
            this.speaker = new Speaker()
            const decoder = new Lame({ output: "buffer" }).setFile(music.file);
            await decoder.decode()
            const buffer = decoder.getBuffer()
            this.mstream = new stream.PassThrough();
            this.mstream.end(buffer);
            this.mstream.pipe(this.speaker)
        } catch (e) {
            console.log(`server music id = ${id} unable to play due to ${String(e)}`)
        }
    }
}

export const music = new Music()

fstree(conf.musicRoot, /\.mp3$/)
    .then(res => {
        let bad = 0
        for (const name of res) {
            const items = name.substring(conf.musicRoot.length + 1).split('/')
            switch (items.length) {
                case 2:
                    music.add(items[0], "", items[1].replace(/.mp3$/, ''), name)
                    break
                case 3:
                    music.add(items[0], items[1], items[2].replace(/.mp3$/, ''), name)
                    break
                default:
                    bad++
                //console.warn(`music path incorrect: ${name}`)
            }
        }
        if (bad > 0) console.warn(`found ${bad} music path incorrect`)
    })
    .catch(err =>
        console.debug(`fstree walk failed due to : ${String(err)}`)
    )
