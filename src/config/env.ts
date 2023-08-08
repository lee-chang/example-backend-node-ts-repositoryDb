import "dotenv/config";

export const API_VERSION = process.env.API_VERSION || "v1";
export const PORT = process.env.PORT || 3000;

export const MONGODB_URI = process.env.MONGODB_URI

export const TOKEN_SECRET = process.env.TOKEN_SECRET || 'secret'
export const NAME_STORAGE_TOKEN_JWT = process.env.NAME_STORAGE_TOKEN_JWT

export const SMTP_HOST = process.env.SMTP_HOST
export const SMTP_USER = process.env.SMTP_USER
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD