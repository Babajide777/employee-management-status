import bcrypt from "bcryptjs";

//To hash pasword
export default (password: string): string => {
	const salt = bcrypt.genSaltSync(15);
	return bcrypt.hashSync(password, salt);
};

//To validate user password
export const validatePassword = async (
	formPassword: string,
	dbPassword: string
): Promise<[boolean, any]> => {
	try {
		const check = await bcrypt.compare(formPassword, dbPassword);

		return check
			? [true, "Password correct"]
			: [false, "Password is incorrect"];
	} catch (error) {
		return [false, { error }];
	}
};
