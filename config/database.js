module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'gtn-mongol-back'),
      user: env('DATABASE_USERNAME', 'gtn-db-admin'),
      password: env('DATABASE_PASSWORD', '9904'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
