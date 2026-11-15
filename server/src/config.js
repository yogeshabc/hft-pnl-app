import 'dotenv/config';
export const config={port:Number(process.env.PORT||4000),databaseUrl:process.env.DATABASE_URL||'',jwtSecret:process.env.JWT_SECRET||'',nodeEnv:process.env.NODE_ENV||'development'};
export function validateConfig(){if(config.nodeEnv==='production'&&(!config.databaseUrl||!config.jwtSecret))throw new Error('DATABASE_URL and JWT_SECRET are required in production');}
