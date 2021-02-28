import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utills/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utills/createUrlqClient';

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
	const router = useRouter();
	const [, register] = useRegisterMutation();
	return (
		<Wrapper variant='small'>
			<Formik
				initialValues={{ username: '', password: '', email: '' }}
				onSubmit={async (values, { setErrors }) => {
					const response = await register({ options: values });
					if (response.data?.register.errors) {
						setErrors(toErrorMap(response.data.register.errors));
					} else if (response.data?.register.user) {
						router.push('/');
					}
				}}>
				{(isSubmitting) => (
					<Form>
						<Box>
							<InputField name='username' placeholder='' label='Username' />
						</Box>
						<Box mt={4}>
							<InputField name='email' placeholder='' label='Email' />
						</Box>
						<Box mt={4}>
							<InputField
								name='password'
								placeholder=''
								label='Password'
								type='password'
							/>
						</Box>
						<Button mt={4} type='submit' color='teal' isLoading={!isSubmitting}>
							Sign up
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

export default withUrqlClient(createUrqlClient)(Register);
