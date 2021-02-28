import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Button,
	VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utills/createUrlqClient';
import { toErrorMap } from '../../utills/toErrorMap';

export const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
	const router = useRouter();
	const [, changePassword] = useChangePasswordMutation();
	const [tokenError, setTokenError] = useState('');
	return (
		<Wrapper variant='small'>
			<Formik
				initialValues={{ newPassword: '' }}
				onSubmit={async (values, { setErrors }) => {
					const response = await changePassword({
						newPassword: values.newPassword,
						token,
					});
					if (response.data?.changePassword.errors) {
						const errorMap = toErrorMap(response.data.changePassword.errors);
						if ('token' in errorMap) {
							setTokenError(errorMap.token);
						}
						setErrors(errorMap);
					} else if (response.data?.changePassword.user) {
						router.push('/');
					}
				}}>
				{(isSubmitting) => (
					<Form>
						<VStack>
							{tokenError ? (
								<>
									<Alert
										status='warning'
										variant='solid'
										mt='1rem'
										alignItems='center'
										justifyContent='center'
										textAlign='center'>
										<AlertIcon />
										<AlertTitle>Token Error:</AlertTitle>
										<AlertDescription>{tokenError}</AlertDescription>
									</Alert>
									<NextLink href='/forgot-password'>
										<Button variantColor='teal' variant='solid'>
											Get one more
										</Button>
									</NextLink>
								</>
							) : (
								<>
									<InputField
										name='newPassword'
										placeholder=''
										label='New Password'
										type='password'
									/>
									<Button
										mt={4}
										type='submit'
										variant='solid'
										variantColor='teal'
										isLoading={!isSubmitting}>
										Change Password
									</Button>
								</>
							)}
						</VStack>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

ChangePassword.getInitialProps = ({ query }) => {
	return {
		token: query.token as string,
	};
};

export default withUrqlClient(createUrqlClient, { ssr: false })(ChangePassword);
