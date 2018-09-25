export function timeStamp() {
    const time = new Date();
    const y = time.getFullYear();
    const m = time.getMonth() + 1;
    const d = time.getDate();
    const h = time.getHours();
    const mm = time.getMinutes();
    const s = time.getSeconds();
    const ms = time.getMilliseconds();
    return "" + y + this.add0(m) + this.add0(d) + this.add0(h) + this.add0(mm) + this.add0(s) + this.add0(ms);
}
function add0(m) {
    return m < 10 ? '0' + m : m;
}