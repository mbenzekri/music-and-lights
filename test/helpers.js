/* eslint-disable no-undef */
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { JSDOM } from "jsdom"
const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body><hello-world id="hello"></hello-world></body></html>`);
global.window = dom.window
global.document = dom

// to get __dirname of ESM module
export function _dirname(metaurl) {   
    const __filename = fileURLToPath(metaurl)
    return dirname(__filename)
}

export function createDom(html) {
    const dom = new JSDOM(html);
    global.window = dom.window
    global.document = dom
}
