import childProcess from 'child_process';
import { Client } from 'pg';
import format from 'pg-format';
import util from 'util';

const exec = util.promisify(childProcess.exec);

/**
 * Sets up a test database. Assumes DATABASE_URL is set properly.
 */
export const setupDB = async (): Promise<boolean> => {
  // ensure the db is created and migrated
  await exec(`npx prisma migrate reset --skip-seed --force`);

  return true;
};

export function getSchema(
  databaseUrl: string,
  defaultSchema = 'public',
): string {
  const url = new URL(databaseUrl);
  if (url) {
    return url.searchParams.get('schema') || defaultSchema;
  }
  return defaultSchema;
}

/**
 * Resets a database to a blank state.
 * Truncates all tables except for _Migrations
 */
export const resetDB = async (): Promise<boolean> => {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('resetDB should only be run in test environment');
  }

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL not set');
  }

  const schema = getSchema(connectionString);

  const client = new Client({
    connectionString,
  });

  await client.connect();
  const sql = format(
    `DO
  $func$
  BEGIN
    EXECUTE
    (SELECT 'TRUNCATE TABLE ' || string_agg(oid::regclass::text, ', ') || ' CASCADE'
      FROM   pg_class
      WHERE  relkind = 'r'  -- only tables
      AND    relname != '_migration'
      AND    relnamespace = %L::regnamespace
    );
  END
  $func$;`,
    schema,
  );

  await client.query(sql);

  await client.end();

  return true;
};
