function add0(m) {
    return m < 10 ? '0' + m : m;
}

export function timeStamp() {
    const time = new Date();
    const y = time.getFullYear();
    const m = time.getMonth() + 1;
    const d = time.getDate();
    const h = time.getHours();
    const mm = time.getMinutes();
    const s = time.getSeconds();
    const ms = time.getMilliseconds();
    return "" + y + add0(m) + add0(d) + add0(h) + add0(mm) + add0(s) + add0(ms);
}

exports = (name) => {
    let SEARCH = window.location.search;
    let reg = new RegExp(`(\\?|&)${name}(\\[\\])?=([^&]*)`);
    let value = SEARCH.match(reg);
  
    return value ? value[3] : '';
  };
  