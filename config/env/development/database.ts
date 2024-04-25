export default ({ env }) => ({
	connection: {
		client: 'mysql',
		connection: {
		host: env('DATABASE_HOST', 'localhost'),
			port: env.int('DATABASE_PORT', 3307),
			database: env('DATABASE_NAME', 'bac'),
			user: env('DATABASE_USERNAME', 'bac'),
			password: env('DATABASE_PASSWORD', '12345'),
			ssl: env.bool('DATABASE_SSL', false)
		}
	}
});
