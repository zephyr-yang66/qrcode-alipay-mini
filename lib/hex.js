// 页面加载

export default function () {
    var result = uni.base64ToArrayBuffer(str);
    result = Array.prototype.map.call(new Uint8Array(result), (x) => ('00' + x.toString(16)).slice(-2)).join('');
    result = new Uint8Array(result.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
    return result = String.fromCharCode.apply(null, result);
}
