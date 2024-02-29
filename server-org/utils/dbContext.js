import pgPromise from "pg-promise";
import {DATABASE_IP, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME} from '../config/index.js';
const pgp = pgPromise({/* Initialization Options */});
const cn = `postgres://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_IP}:${DATABASE_PORT}/${DATABASE_NAME}`;
export const db = pgp(cn);

