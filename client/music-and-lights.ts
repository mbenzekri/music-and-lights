import { html, LitElement } from "lit";
import { property, customElement } from "lit/decorators";

type MusicItem = {
    id: number
    artist: string
    album: string
    title: string
    words: string[]
    file: string
}

@customElement("music-and-lights")
export class MusicAndLights extends LitElement {

    private found: MusicItem[] = []
    @property({ type: String, attribute: "who" }) who = "World"
    @property({ type: String, attribute: false }) pattern = ""
    render() {
        return html`
            <link href="/assets/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
            <link href="/assets/bootstrap-icons.css" rel="stylesheet" crossorigin="anonymous">
            <nav>
                <div class="input-group mb-3">
                    <input type="text"   @keyup="${this.enter}" @change="${this.change}" .value="${this.pattern}" class="form-control" placeholder="titre, chanteur, album" aria-label="Username" aria-describedby="basic-addon1">
                    <div class="input-group-append">
                        <span class="btn btn-primary input-group-text" id="basic-addon1"  @click="${this.search}"  >Search</span>
                    </div>
                </div>
            </nav>
            <ul> ${this.found.map(item =>
                html`
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">
                                <button class="btn btn-primary" @click="${() => this.vote(item)}" type="button" style="float:right"><img src="/assets/heart.png" style="witdh:1.5em;height:1.5em;"/></button>
                                ${item.title} 
                            </h5>
                            <h6 class="card-subtitle mb-2 text-muted">${item.artist}</h6>
                            <p class="card-text">${item.album}</p>
                            
                        </div>
                    </div>`
            )}  </ul>
        `
    }
    m2s(music: MusicItem) {
        return JSON.stringify(music).replace(/["}{]+/g,'')
    }
    private async vote(music: MusicItem) {
        try {
            const resp = await fetch(`/music/${music.id}/play`)
            if (resp.status !== 200) {
                console.log(`server fail to play ${this.m2s(music)} error :${resp.statusText}`)
            } 
        } catch(e) {
            console.log(`fail to play ${this.m2s(music)}`)
        }
    }
    private change(evt: Event) {
        this.pattern = evt.target ? (evt.target as HTMLInputElement).value : ""
        evt.preventDefault()
        evt.stopPropagation()
    }
    private async search() {
        if (this.pattern == "") {
            this.found = []
            this.requestUpdate()
            return
        }
        try {
            const resp = await fetch(`/music?limit=20&pattern=${this.pattern}`)
            this.found = await resp.json()
            this.requestUpdate()
        } catch (e) {
            console.error(`Error when searching music: ${String(e)}`)
        }
    }
    enter(evt: KeyboardEvent) {
        if (evt.key === "Enter")  this.search()
    }
}