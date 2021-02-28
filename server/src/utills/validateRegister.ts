import { UsernamePasswordInput } from './UsernamePasswordInput';
import { passwordValidation } from './validation/passwordValidation';
import { usernameValidation } from './validation/usernameValidation';
import { emailValidation } from './validation/emailValidation';
export const validateRegister = (options: UsernamePasswordInput) => {
	if (!emailValidation(options.email)) {
		return [
			{
				field: 'email',
				message: 'Invalid email',
			},
		];
	}

	if (!usernameValidation(options.username)) {
		return [
			{
				field: 'username',
				message: 'Wrong username format',
			},
		];
	}

	if (!passwordValidation(options.password)) {
		return [
			{
				field: 'password',
				message: 'Wrong password format',
			},
		];
	}

	return null;
};
