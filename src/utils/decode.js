import CryptoJS from 'crypto-js'
// 解密函数
export default function getDAesString(encrypted){
  var key = CryptoJS.enc.Utf8.parse("liwaiqiang250e284d1a00liwaiqiang");
  var decrypted =CryptoJS.AES.decrypt(encrypted,key,
      {
          mode:CryptoJS.mode.ECB,
          padding:CryptoJS.pad.Pkcs7
      });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
