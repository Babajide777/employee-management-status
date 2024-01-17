import crypto from "crypto";
import { CRYPTOSECRETKEY } from "../config";
const algorithm = "aes-256-ctr";
const secretKey = CRYPTOSECRETKEY;
const iv = crypto.randomBytes(16);

//encrypt a text
export const encrypt = (text: any): { iv: string; content: string } => {
	const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
	const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
	return {
		iv: iv.toString("hex"),
		content: encrypted.toString("hex"),
	};
};

//decrypt a hashed text
export const decrypt = (hash: any) => {
	const decipher = crypto.createDecipheriv(
		algorithm,
		secretKey,
		Buffer.from(hash.iv, "hex")
	);
	const decrpyted = Buffer.concat([
		decipher.update(Buffer.from(hash.content, "hex")),
		decipher.final(),
	]);
	return decrpyted.toString();
};

export const uniqueCode = (length: number) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

export function generateUniqueCode(): string {
    const prefix = "GPL";
    const category = "UT";
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000); // You can adjust the range as needed
    return `${prefix}/${category}/${timestamp}-${randomNumber}`;
}
