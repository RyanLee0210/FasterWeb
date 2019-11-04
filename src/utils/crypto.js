import CryptoJS from 'crypto-js'
// 加密函数
export default function(word) {
    var key = CryptoJS.enc.Utf8.parse("liwaiqiang250e284d1a00liwaiqiang");
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  };
