function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
}

export const env = {
  PORT: getEnv('PORT'),
  DATABASE_URL: getEnv('DATABASE_URL'),
};

export type Env = typeof env;
