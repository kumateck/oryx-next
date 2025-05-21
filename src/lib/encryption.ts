// // lib/encryption.ts
// interface EncryptedData {
//     iv: string;
//     cipherText: string;
//     authTag: string;
//   }

//   export class EncryptionService {
//     private readonly algorithm = 'AES-GCM';
//     private key!: CryptoKey;

//     constructor(private secret: string) {
//       if (!secret || secret.length < 32) {
//         throw new Error('Encryption secret must be at least 32 characters');
//       }
//     }

//     async initialize() {
//       const keyMaterial = await crypto.subtle.importKey(
//         'raw',
//         new TextEncoder().encode(this.secret),
//         'PBKDF2',
//         false,
//         ['deriveKey']
//       );

//       this.key = await crypto.subtle.deriveKey(
//         {
//           name: 'PBKDF2',
//           salt: new TextEncoder().encode('Static salt for key derivation'),
//           iterations: 100000,
//           hash: 'SHA-256',
//         },
//         keyMaterial,
//         { name: this.algorithm, length: 256 },
//         true,
//         ['encrypt', 'decrypt']
//       );
//     }

//     async encrypt(data: unknown): Promise<string> {
//       const iv = crypto.getRandomValues(new Uint8Array(12));
//       const encodedData = new TextEncoder().encode(JSON.stringify(data));

//       const cipherText = await crypto.subtle.encrypt(
//         {
//           name: this.algorithm,
//           iv,
//         },
//         this.key,
//         encodedData
//       );

//       return JSON.stringify({
//         iv: Buffer.from(iv).toString('base64'),
//         cipherText: Buffer.from(cipherText).toString('base64'),
//       });
//     }

//     async decrypt(encrypted: string): Promise<any> {
//       const { iv, cipherText } = JSON.parse(encrypted) as EncryptedData;

//       const decrypted = await crypto.subtle.decrypt(
//         {
//           name: this.algorithm,
//           iv: Buffer.from(iv, 'base64'),
//         },
//         this.key,
//         Buffer.from(cipherText, 'base64')
//       );

//       return JSON.parse(new TextDecoder().decode(decrypted));
//     }
//   }

// // crypto-utils.ts
// import CryptoJS from 'crypto-js';
// import { env } from './env';

// // Secret key for encryption - should be stored in environment variables
// const SECRET_KEY =env.ENCRYPTION_SECRET //process.env.ENCRYPTION_SECRET || 'default-development-key-change-in-production';

// /**
//  * Encrypts data using AES encryption from crypto-js
//  * @param data - The string data to encrypt
//  * @returns The encrypted string
//  */
// export function encrypt(data: string): string {
//   return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
// }

// /**
//  * Decrypts data that was encrypted with the encrypt function
//  * @param encryptedData - The encrypted string to decrypt
//  * @returns The decrypted string
//  */
// export function decrypt(encryptedData: string): string {
//   const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
//   return bytes.toString(CryptoJS.enc.Utf8);
// }

// lib/encryption.ts
export class EncryptionService {
  private readonly algorithm = "AES-GCM";
  private key!: CryptoKey;
  private readonly CHUNK_SIZE = 3072; // 3KB raw = 4KB base64

  constructor(private secret: string) {
    if (!secret || secret.length < 32) {
      throw new Error("Encryption secret must be at least 32 characters");
    }
  }

  async initialize() {
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(this.secret),
      "PBKDF2",
      false,
      ["deriveKey"],
    );

    this.key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: new TextEncoder().encode("Static salt"),
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: this.algorithm, length: 256 },
      true,
      ["encrypt", "decrypt"],
    );
  }

  async encrypt(data: unknown): Promise<string[]> {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encodedData = new TextEncoder().encode(JSON.stringify(data));

    const ciphertext = await crypto.subtle.encrypt(
      { name: this.algorithm, iv },
      this.key,
      encodedData,
    );

    // Combine IV + ciphertext (which includes auth tag)
    const combined = new Uint8Array(iv.byteLength + ciphertext.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(ciphertext), iv.byteLength);

    // Split into chunks
    const chunks: string[] = [];
    for (let i = 0; i < combined.length; i += this.CHUNK_SIZE) {
      const chunk = combined.slice(i, i + this.CHUNK_SIZE);
      chunks.push(Buffer.from(chunk).toString("base64"));
    }

    return chunks;
  }

  async decrypt(chunks: string[]): Promise<any> {
    // Reconstruct combined buffer
    const buffers = chunks.map((chunk) => Buffer.from(chunk, "base64"));
    const combined = new Uint8Array(
      buffers.reduce((acc, buf) => acc + buf.length, 0),
    );

    let offset = 0;
    buffers.forEach((buf) => {
      combined.set(buf, offset);
      offset += buf.length;
    });

    // Extract IV and ciphertext
    const iv = combined.slice(0, 12);
    const ciphertext = combined.slice(12);

    const decrypted = await crypto.subtle.decrypt(
      { name: this.algorithm, iv },
      this.key,
      ciphertext,
    );

    return JSON.parse(new TextDecoder().decode(decrypted));
  }
}
