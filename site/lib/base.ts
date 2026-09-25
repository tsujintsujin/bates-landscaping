// The site is served at justin94.space/bates (Portfolio proxies /bates/* to this app), so every route lives under
// /bates. next/link adds it to page links automatically; images, video and other /public files need asset().
export const BASE = "/bates";
export const asset = (path: string) => BASE + path;
