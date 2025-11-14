import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig = (): TypeOrmModuleOptions => {
  // Parse connection string from environment or use provided one
  const dbUrl =
    process.env.DATABASE_INTERNAL_URL ||
    'postgresql://podb_mveu_user:6jGoFugftRwgslkMXQvkM3Xn52lGGB0p@dpg-d4bi1gm3jp1c73bincvg-a.oregon-postgres.render.com/podb_mveu';

  const url = new URL(dbUrl);

  return {
    type: 'postgres',
    host: url.hostname,
    port: parseInt(url.port || '5432', 10),
    username: url.username,
    password: url.password,
    database: url.pathname.replace('/', ''),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    migrationsRun: false,
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV !== 'production',
    ssl: { rejectUnauthorized: false },
  };
};
