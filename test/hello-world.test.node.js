"use strict"
import {createDom} from "./helpers"
import "../build/hello-world"
describe('Test HelloWorld.ts', () => {

    beforeAll(async () => null)
    beforeEach(() => null);

    test('should create dom hello-world', async () => {
        const dom = createDom(`<!DOCTYPE html><html><head></head><body><hello-world id="hello"></hello-world></body></html>`);
        const hw = dom.getElementById("hello")
        expect(hw.who).toBe("World");
    })

})
