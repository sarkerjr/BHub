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
  AWS_ENDPOINT: getEnv('AWS_ENDPOINT'),
  AWS_REGION: getEnv('AWS_REGION'),
  AWS_ACCESS_KEY_ID: getEnv('AWS_ACCESS_KEY_ID'),
  AWS_SECRET_ACCESS_KEY: getEnv('AWS_SECRET_ACCESS_KEY'),
  AWS_S3_BUCKET_NAME: getEnv('AWS_S3_BUCKET_NAME'),
  JWT_SECRET: getEnv('JWT_SECRET'),
};

export type Env = typeof env;
