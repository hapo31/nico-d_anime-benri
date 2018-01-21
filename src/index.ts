const safeSplit = (text: string|null|undefined, separator: string|RegExp, limit?: number): string[] =>{
    if (text == null) return [];
    return text.split(separator, limit);
};

const element: HTMLElement = document.querySelector(".contentHeader > h1 > span") || document.querySelector(".message > p > span");
const keyword = safeSplit(element.innerText, /\s/)
    .filter(v => !v.match(/[dD]アニメストア/))
    .join(" ");

if (keyword.length > 0 && confirm(`'${keyword}'を、dアニメストア ニコニコ支店 で検索しますか？`)) {
    location.href = `http://ch.nicovideo.jp/search/${encodeURIComponent(keyword)}?channel_id=ch2632720&mode=s&sort=f&order=a&type=video`;
}
