import fs from 'fs';
export class Chrono extends Date {
    constructor() {
        super();
        this.tops = {};
        this.start();
    }
    start() {
        this.reset();
        this.tops = {};
    }
    reset() {
        this.setTime(Date.now());
    }
    log(txt) {
        const t = this.top();
        const sum = Object.values(this.tops).reduce((prev, curr) => prev + curr, t);
        const res = Object.keys(this.tops).reduce((str, key) => str.replace(`\${${key}}`, String(this.tops[key])), txt);
        console.log(res.replace("%top%", String(t)).replace("%all%", String(sum)));
    }
    topset(key) {
        const t = this.top(key);
        this.reset();
        return t;
    }
    top(key) {
        const t = Date.now() - this.getTime();
        if (key)
            this.tops[key] = t;
        return t;
    }
}
export async function timed(todo, timecb) {
    const c = new Chrono();
    const v = await todo;
    try {
        timecb(c.top(), v);
        return v;
    }
    catch (e) {
        timecb(c.top(), null);
        throw e;
    }
}
export function* range(end, start = 0, step = 1) {
    let x = start - step;
    while (x < end - step)
        yield x += step;
}
/**
 * flatten an array of array recursively
 * @param v  array or value to flatten
 * @returns an array of one level
 */
export function flatten(v, arr = []) {
    if (Array.isArray(v))
        v.forEach(i => flatten(i, arr));
    else
        v && arr.push(v);
    return arr;
}
export function fstree(directory, include = /.*/, exclude = /^x/) {
    let pending = 0;
    const walk = (stack, resolve, reject, files = []) => {
        if (stack.length == 0 && pending == 0)
            return resolve(files);
        const current = stack.pop();
        if (!current)
            return;
        pending++;
        fs.stat(current, (_err, stat) => {
            if (stat && stat.isDirectory()) {
                pending++;
                fs.readdir(current, function (_err, list) {
                    list && list.forEach((file, _i) => stack.push(current + '/' + file));
                    pending--;
                    walk(stack, resolve, reject, files);
                });
            }
            if (stat && stat.isFile() && include.test(current) && !exclude.test(current))
                files.push(current);
            pending--;
            walk(stack, resolve, reject, files);
        });
    };
    return new Promise((resolve, reject) => walk([directory], resolve, reject));
}
//# sourceMappingURL=tools.js.map