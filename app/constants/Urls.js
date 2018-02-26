export const WEXIN_ARTICLE_LIST = 'http://route.showapi.com/582-2';
export const WEXIN_ARTICLE_TYPE = 'http://route.showapi.com/582-1';

const DEUBUG = true;

const IP_255 = DEUBUG ? "http://192.168.1.100" : "https://vn255.buyoo.xyz";
const IP_191 = DEUBUG ? "http://192.168.1.100" : "https://vn.buyoo.xyz";


const PORT_80 = DEUBUG ? "8180" : "8280";
const PORT_83 = DEUBUG ? "8183" : "8283";
const PORT_84 = DEUBUG ? "8184" : "8284";
const PORT_85 = DEUBUG ? "8185" : "8285";

export const GETADVERSTINFO = IP_255 + ":" + PORT_85 + "/fun/commodity/getAdverstInfo";