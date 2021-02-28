import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, Stack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utills/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utills/createUrlqClient';

export const Login: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [, login] = useLoginMutation();
	return (
		<Wrapper variant='small'>
			<Formik
				initialValues={{ usernameOrEmail: '', password: '' }}
				onSubmit={async (values, { setErrors }) => {
					const response = await login(values);
					if (response.data?.login.errors) {
						setErrors(toErrorMap(response.data.login.errors));
					} else if (response.data?.login.user) {
						router.push('/');
					}
				}}>
				{(isSubmitting) => (
					<Form>
						<InputField
							name='usernameOrEmail'
							placeholder=''
							label='Username or Email'
						/>
						<Box mt={4}>
							<InputField
								name='password'
								placeholder=''
								label='Password'
								type='password'
							/>
						</Box>
						<Stack direction='row' spacing='1rem' mt='1rem'>
							<Button
								type='submit'
								variant='solid'
								color='teal'
								isLoading={!isSubmitting}>
								Login
							</Button>
							<NextLink href='/forgot-password'>
								<Button color='teal' variant='solid'>
									Forgot password?
								</Button>
							</NextLink>
						</Stack>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

export default withUrqlClient(createUrqlClient)(Login);
