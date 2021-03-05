import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { InputField } from '../components/InputField';
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from '../utills/createUrlqClient';
import { useRouter } from 'next/router';
import { Layout } from '../components/Layout';
import { useIsAuth } from '../utills/useIsAuth';

const createPost: React.FC<{}> = ({}) => {
	const router = useRouter();
	useIsAuth();
	const [, createPost] = useCreatePostMutation();
	return (
		<Layout variant='small'>
			<Formik
				initialValues={{ title: '', text: '' }}
				onSubmit={async (values) => {
					const { error } = await createPost({ input: values });
					if (!error) {
						router.push('/');
					}
				}}>
				{(isSubmitting) => (
					<Form>
						<InputField name='title' placeholder='' label='Title' />
						<Box mt={4}>
							<InputField textarea name='text' placeholder='' label='Body' />
						</Box>

						<Button
							mt='1rem'
							type='submit'
							variant='solid'
							color='teal'
							isLoading={!isSubmitting}>
							Create post
						</Button>
					</Form>
				)}
			</Formik>
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient)(createPost);
