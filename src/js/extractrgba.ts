import { fastParseInt16 } from "./utils";

export default function extractrgba(str:string) {
    let ret = [0, 0, 0, 1];
    if (str[0] === "#") {
        // hex, convert to rgba
        const r = fastParseInt16(str[1] + str[2]);
        const g = fastParseInt16(str[3] + str[4]);
        const b = fastParseInt16(str[5] + str[6]);
        str = 'rgba('+r+','+g+','+b+',1)';
    }
    const match = str.match(/^[\s]*rgba\([\s]*([0-9.]+)[\s]*,[\s]*([0-9.]+)[\s]*,[\s]*([0-9.]+)[\s]*,[\s]*([0-9.]+)[\s]*\)[\s]*$/);
    if (match && match.length === 5) {
        ret = [parseFloat(match[1]) / 255,
            parseFloat(match[2]) / 255,
            parseFloat(match[3]) / 255,
            parseFloat(match[4])];
    }
    return ret;
};
