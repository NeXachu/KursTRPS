import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { createUrqlClient } from '../utills/createUrlqClient';

const createPost: React.FC<{}> = ({}) => {
	return (
		<Wrapper variant='small'>
			<Formik
				initialValues={{ title: '', text: '' }}
				onSubmit={async (values) => {
					console.log(values);
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
		</Wrapper>
	);
};

export default withUrqlClient(createUrqlClient)(createPost);
