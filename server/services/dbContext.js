const pgPromise = require("pg-promise");

const pgp = pgPromise({/* Initialization Options */});

const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_IP = process.env.DATABASE_IP;
const DATABASE_PORT = process.env.DATABASE_PORT;
const DATABASE_NAME = process.env.DATABASE_NAME;

const cn = `postgres://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_IP}:${DATABASE_PORT}/${DATABASE_NAME}`;
const db = pgp(cn);

module.exports = db;