import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { createUrqlClient } from '../utills/createUrlqClient';

export const ForgotPassword: React.FC<{}> = ({}) => {
	const [complete, setComplete] = useState(false);
	const [, forgotPassword] = useForgotPasswordMutation();
	return (
		<Wrapper variant='small'>
			<Formik
				initialValues={{ email: '' }}
				onSubmit={async (values) => {
					await forgotPassword(values);
					setComplete(true);
				}}>
				{() =>
					complete ? (
						<Box> Password reset link has been send to your email.</Box>
					) : (
						<Form>
							<InputField name='email' placeholder='' label='Email' />

							<Button type='submit' variant='solid' color='teal' mt='1rem'>
								Request
							</Button>
						</Form>
					)
				}
			</Formik>
		</Wrapper>
	);
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
