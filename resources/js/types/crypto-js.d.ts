declare module 'crypto-js' {
    export namespace AES {
      function encrypt(message: string | CryptoJS.lib.WordArray, secretPassphrase: string): CryptoJS.lib.CipherParams;
      function decrypt(encryptedMessage: string | CryptoJS.lib.CipherParams, secretPassphrase: string): CryptoJS.lib.WordArray;
    }

    export namespace enc {
      export namespace Utf8 {
        function parse(utf8String: string): CryptoJS.lib.WordArray;
        function stringify(wordArray: CryptoJS.lib.WordArray): string;
      }
    }

    export namespace lib {
      export class WordArray {
        words: number[];
        sigBytes: number;
      }

      export class CipherParams {
        ciphertext: WordArray;
      }
    }
  }
