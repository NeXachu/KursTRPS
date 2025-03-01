import React from 'react';
import { useField } from 'formik';
import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Textarea,
} from '@chakra-ui/react';

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	name: string;
	textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
	label,
	textarea,
	size: _,
	...props
}) => {
	let InputOrTextArea = Input;
	if (textarea) {
		InputOrTextArea = Textarea;
	}
	const [field, { error }] = useField(props);
	return (
		<FormControl isInvalid={!!error}>
			<FormLabel htmlFor={field.name}>{label}</FormLabel>
			<InputOrTextArea {...field} {...props} id={field.name} />
			{error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
		</FormControl>
	);
};
