export const usernameValidation = (username: string) => {
	const usernameRegex = new RegExp('^[a-zA-Z0-9_-]{6,15}$');
	return usernameRegex.test(username);
};
