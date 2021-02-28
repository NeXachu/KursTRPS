export const emailValidation = (email: string) => {
	const emailRegex = new RegExp('[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+');
	return emailRegex.test(email);
};
