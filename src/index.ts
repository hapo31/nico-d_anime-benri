
const PAGE_TYPE = {
    watch: "watch",
    search: "search",
    tag: "tag"
};

function onSearchPage() {
    const element: HTMLElement = document.querySelector(".contentHeader > h1 > span") || document.querySelector(".message > p > span");
    const keyword = safeSplit(element, /\s/)
        .filter(v => !v.match(/[dD]アニメストア/))
        .join(" ");

    if (keyword.length > 0 && confirm(`'${keyword}'を、dアニメストア ニコニコ支店 で検索しますか？`)) {
        location.href = `http://ch.nicovideo.jp/search/${encodeURIComponent(keyword)}?channel_id=ch2632720&mode=s&sort=f&order=a&type=video`;
    }
}

function onWatchPage() {
    const channelPageLink = document.querySelector<HTMLAnchorElement>(".ChannelInfo-pageLinks > a");
    // dアニメストア動画以外では動かない
    if (!channelPageLink || channelPageLink.href.indexOf("ch2632720") === -1) {
        return;
    }
    const video = document.querySelector("video");
    if (video) {
        video.addEventListener("ended", () => {
            const description = document.querySelector<HTMLDivElement>("div.VideoDescription-html");
            const nextEpLink = description.innerHTML.match(/次話→<a href="([^"]*)" class="watch">so\d*<\/a>/);
            if (nextEpLink) {
                const video = document.querySelector("video");
                const nextEpAnchor = document.querySelector<HTMLAnchorElement>(`a[href="${nextEpLink[1]}"`);
                nextEpAnchor.click();
            }
        });
    }
}

function safeSplit(text: HTMLElement | null | undefined, separator: string | RegExp, limit?: number): string[] {
    if (text == null) return [];
    return text.innerText.split(separator, limit);
};


/**
 * ページの種類を取得
 * @param url
 */
function getPageType(url: string) {
    if (url.indexOf("search") >= 0) {
        return PAGE_TYPE.search;
    }
    if (url.indexOf("tag") >= 0) {
        return PAGE_TYPE.tag;
    }
    if (url.indexOf("watch") >= 0) {
        return PAGE_TYPE.watch;
    }
}

function main() {
    switch (getPageType(location.href)) {
        case PAGE_TYPE.search:
        case PAGE_TYPE.tag:
            onSearchPage();
            break;

        case PAGE_TYPE.watch:
            onWatchPage();
            break;
        default:
            console.error("unkown type");
    }
}

main();