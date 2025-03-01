import 'reflect-metadata';
import express from 'express';
import { COOKIE_NAME, __prod__ } from './constants';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { User } from './entities/User';
import { Post } from './entities/Post';

const main = async () => {
	const conn = await createConnection({
		type: 'postgres',
		database: 'kursv2',
		username: 'postgres',
		password: 'postgres',
		logging: true,
		synchronize: true,
		entities: [Post, User],
	});

	const app = express();

	const RedisStore = connectRedis(session);
	const redis = new Redis();
	app.use(
		cors({
			origin: 'http://localhost:3000',
			credentials: true,
		})
	);

	app.use(
		session({
			name: COOKIE_NAME,
			store: new RedisStore({
				host: 'localhost',
				port: 6379,
				client: redis,
			}),
			cookie: {
				maxAge: 1000 * 60 * 60 * 34 * 365 * 10, //10 years
				httpOnly: true,
				sameSite: 'lax', //csrf
				secure: __prod__,
			},
			saveUninitialized: false,
			secret: 'qweqweqweqhkegsdhfwerhwgrjhgfusdoifuo', //#TODO
			resave: false,
		})
	);

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, PostResolver, UserResolver],
			validate: false,
		}),
		context: ({ req, res }) => ({ req, res, redis }),
	});

	apolloServer.applyMiddleware({ app, cors: false });

	app.get('/', (_, res) => {
		res.send('hello');
	});

	app.listen(4000, () => {
		console.log('Server started on localhost:4000');
	});
};

main().catch((err) => {
	console.log(err);
});
