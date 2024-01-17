import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

interface IData {
	token?: string;
}

// create and sign json web token
export const signJwt = (id: number): IData => {
	const token = jwt.sign({ id }, TOKEN_SECRET, {
		expiresIn: 60 * 60 * 24 * 30,
	});
	const data: IData = {};
	data.token = token;
	return { token: data.token };
};

export const generateResetToken = (email: string): IData => {
	const token = jwt.sign({ email }, TOKEN_SECRET, {
		expiresIn: 60 * 60 * 1,
	});
	const data: IData = {};
	data.token = token;
	return { token: data.token };
};

// Verify the reset token
export const verifyResetToken = (token: string) => {
	try {
		const decoded: any = jwt.verify(token, TOKEN_SECRET);
		return decoded;
	} catch (error) {
		throw new Error("Invalid reset token");
	}
};
