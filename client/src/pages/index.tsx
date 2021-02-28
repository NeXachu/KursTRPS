import { NavBar } from '../components/NavBar';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utills/createUrlqClient';
import { usePostsQuery } from '../generated/graphql';

const Index = () => {
	const [{ data }] = usePostsQuery();
	return (
		<>
			<NavBar />
			<div>Index</div>
			{!data ? (
				<div>loading...</div>
			) : (
				data.posts.map((p) => <div key={p.id}>{p.title}</div>)
			)}
		</>
	);
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
