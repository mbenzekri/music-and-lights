var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { html, LitElement } from "lit";
import { property, customElement } from "lit/decorators";
let MusicAndLights = class MusicAndLights extends LitElement {
    constructor() {
        super(...arguments);
        this.found = [];
        this.who = "World";
        this.pattern = "";
    }
    render() {
        return html `
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
            <ul> ${this.found.map(item => html `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">
                                <button class="btn btn-primary" @click="${() => this.vote(item)}" type="button" style="float:right"><img src="/assets/heart.png" style="witdh:1.5em;height:1.5em;"/></button>
                                ${item.title} 
                            </h5>
                            <h6 class="card-subtitle mb-2 text-muted">${item.artist}</h6>
                            <p class="card-text">${item.album}</p>
                            
                        </div>
                    </div>`)}  </ul>
        `;
    }
    m2s(music) {
        return JSON.stringify(music).replace(/["}{]+/g, '');
    }
    async vote(music) {
        try {
            const resp = await fetch(`/music/${music.id}/play`);
            if (resp.status !== 200) {
                console.log(`server fail to play ${this.m2s(music)} error :${resp.statusText}`);
            }
        }
        catch (e) {
            console.log(`fail to play ${this.m2s(music)}`);
        }
    }
    change(evt) {
        this.pattern = evt.target ? evt.target.value : "";
        evt.preventDefault();
        evt.stopPropagation();
    }
    async search() {
        if (this.pattern == "") {
            this.found = [];
            this.requestUpdate();
            return;
        }
        try {
            const resp = await fetch(`/music?limit=20&pattern=${this.pattern}`);
            this.found = await resp.json();
            this.requestUpdate();
        }
        catch (e) {
            console.error(`Error when searching music: ${String(e)}`);
        }
    }
    enter(evt) {
        if (evt.key === "Enter")
            this.search();
    }
};
__decorate([
    property({ type: String, attribute: "who" }),
    __metadata("design:type", Object)
], MusicAndLights.prototype, "who", void 0);
__decorate([
    property({ type: String, attribute: false }),
    __metadata("design:type", Object)
], MusicAndLights.prototype, "pattern", void 0);
MusicAndLights = __decorate([
    customElement("music-and-lights")
], MusicAndLights);
export { MusicAndLights };
//# sourceMappingURL=music-and-lights.js.map