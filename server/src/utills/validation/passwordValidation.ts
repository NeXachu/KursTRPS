export const passwordValidation = (password: string) => {
	const passwordRegex = new RegExp(
		'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'
	);
	return passwordRegex.test(password);
};
