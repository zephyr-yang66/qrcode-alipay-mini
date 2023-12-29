import { QRCode, QRErrorCorrectLevel } from './qrcode';
import utf16to8 from './utf16to8'
import hexString from './hex'
const defaultConfig = {
    width: 256,
    height: 256,
    x: 0,
    y: 0,
    typeNumber: -1,
    correctLevel: QRErrorCorrectLevel.L,
    background: '#ffffff',
    foreground: '#000000',
    image: {
        imageResource: '',
        dx: 0,
        dy: 0,
        dWidth: 100,
        dHeight: 100,
    },
};



/**
 * 创建二维码canvas
 */
function createCanvas(options,fn) {
    // 创建二维码本身
    let qrcode = new QRCode(options.typeNumber, options.correctLevel);

    if(fn) {
        qrcode.addData(fn(options.text));
    }else {
        qrcode.addData(options.text);
    }
    qrcode.make();

    // 获取canvas上下文
    let ctx;
    if (options.ctx) {
        ctx = options.ctx;
    } else {
        ctx = options._this
            ? uni.createCanvasContext && uni.createCanvasContext(options.canvasId, options._this)
            : uni.createCanvasContext && uni.createCanvasContext(options.canvasId);
    }

    // 计算tileW/tileH基于options.width/options.height
    let tileW = options.width / qrcode.getModuleCount();
    let tileH = options.height / qrcode.getModuleCount();

    // 在canvas上绘制二维码
    for (let row = 0; row < qrcode.getModuleCount(); row++) {
        for (let col = 0; col < qrcode.getModuleCount(); col++) {
            let style = qrcode.isDark(row, col) ? options.foreground : options.background;
            ctx.setFillStyle(style);
            let w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
            let h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
            ctx.fillRect(Math.round(col * tileW) + options.x, Math.round(row * tileH) + options.y, w, h);
        }
    }

    // 如果设置了图片，则绘制图片
    if (options.image.imageResource) {
        ctx.drawImage(
            options.image.imageResource,
            options.image.dx,
            options.image.dy,
            options.image.dWidth,
            options.image.dHeight
        );
    }

    // 将绘制好的内容导出为图片并触发回调函数
    ctx.draw(false, function (e) {
        options.callback && options.callback(e);
    });
}
/**
 * @param {QrcodeUtf16Type} data - 二维码数据类型
 */
// eslint-disable-next-line no-undef
function qrcode(data) {
    const options = Object.assign(defaultConfig, data);
    // 检查是否提供了canvasId或ctx
    if (!options.canvasId && !options.ctx) {
        console.warn('请设置canvasId或ctx!');
        return;
    }
    createCanvas(options);
}

// 强制码直 16 进制
function qrcodeHex() {
    const options = Object.assign(defaultConfig, data);
    // 检查是否提供了canvasId或ctx
    if (!options.canvasId && !options.ctx) {
        console.warn('请设置canvasId或ctx!');
        return;
    }
    createCanvas(options,hexString);

}
// 强制码值 utf-8
function qrcodeUtf8 () {
    const options = Object.assign(defaultConfig, data);
    // 检查是否提供了canvasId或ctx
    if (!options.canvasId && !options.ctx) {
        console.warn('请设置canvasId或ctx!');
        return;
    }
    createCanvas(options,utf16to8);
}
export default {
    qrcode,
    qrcodeUtf8,
    qrcodeHex
};
