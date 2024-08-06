const { Sequelize } = require("sequelize");
const fs = require("fs");
require("dotenv").config();
const toBool = (x) => x === "true";
const DATABASE_URL = process.env.DATABASE_URL || "./assets/database.db";
module.exports = {
  ANTILINK: toBool(process.env.ANTI_LINK) || false,
  LOGS: toBool(process.env.LOGS) || true,
  ANTILINK_ACTION: process.env.ANTI_LINK || "kick",
  SESSION_ID: process.env.SESSION_ID ||null,
  LANG: process.env.LANG || "EN",
  AUTH_TOKEN: "",
  HANDLERS:
    process.env.HANDLER === "false" || process.env.HANDLER === "null"
      ? "^"
      : "[#]",
  RMBG_KEY: process.env.RMBG_KEY || false,
  BRANCH: "main",
  WARN_COUNT: 3,
  PACKNAME: process.env.PACKNAME || "X-Asena",
  WELCOME_MSG: process.env.WELCOME_MSG || "",
  GOODBYE_MSG: process.env.GOODBYE_MSG || "",
  AUTHOR: process.env.AUTHOR || "X-Electra",
  SUDO:
    process.env.SUDO || "",
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || "",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  OWNER_NAME: process.env.OWNER_NAME || "Frank kaumba",
  HEROKU: toBool(process.env.HEROKU) || false,
  BOT_NAME: process.env.BOT_NAME || "EFKID-BOT",
  AUTO_READ: toBool(process.env.AUTO_READ) || false,
  AUTO_STATUS_READ: toBool(process.env.AUTO_STATUS_READ) || false,
  PROCESSNAME: process.env.PROCESSNAME || "x-asena",
  WORK_TYPE: process.env.WORK_TYPE || "private",
  SESSION_URL: process.env.SESSION_URL || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibU5JUHVRZTcvZlpzRCtuK0hyQWNqSUF3YmFtT0RkcTZOcUpiMkNnYnhrZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUzV5S09ZQlM1Q2pKY3V4U2EyRUNlL2tpL09sbUVsVVJnckZHUWQwcHdYRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTRnNqRzhQSnhkVnA5azg3Z2xHc0t3MVdyanY0RHRBMlhFbkRnU0xNMkZZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPS2FEUm12MHVyUFhpV3NTSDFJZnZFOHFIRU85VFB5anNERVVrQnFyRG5zPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVJdU1yMFlFOUZFeUhVL1pvTVk1R1BHRTdUY1pZVTZ2dGd3SDRBN0tsR3c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJkSHY1OEErWGRNQnVvczhpWmM4bHJSSTRDakMxbTZ3bldMYVJjYm91aVk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ09QcTFONWx6b0poNFhjTlVvM21idU95THBZOWFFRVlUenF4ODVQQlJuOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQXFxcmZOZW5qVGVZMzZDS3NYUXV6MkVNbWpjR0VaRFFpTThPSnJZZ3RFVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhNZG9HaFhrRkhUeTl6Z3dlQThYc0tVaE01RFVxODVWK0ZUWTFqeWwrb1c5QUxiYldoUmRMVlMwU0gvOW9sUFVyNUhHZkdIM3hYNjQ2WUtHZUVtRUJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ4LCJhZHZTZWNyZXRLZXkiOiJFWWFhZTlab0Zod1ZJYzFHRlhpcGZ6cGJqMktEUmRaMEQ3RnZJUW16djQ4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJOeTRUVXVIdlJmT2tsbk1VcGxvSlpRIiwicGhvbmVJZCI6ImExMzQ4NjczLTkwYWYtNGQxOS04YWVhLTVkZjEzMGFkOGExMyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjMkw4RGtMSVRMekY1Uk8wN2k5NXRHZm5IMVU9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkY3RGt0RzdCUm9YcHVpSzJqYzRWZFpJbGYyQT0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0l2ZzNzNEJFUDZ0djdVR0dBVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkpTbmRST1lmdllhVlhOblZNdWgra1NlTXdWYlRZQXZRWE5KQW5LbmQrMDQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkFBTXBjOERMNWtCQXVtL2dKdVhhejU2RDVvbUR4c0tNalZjSWdQZHUrcjF6bHBYSjc0SDdKZVFDd0dqdUkvTE5GbmMzOEg5NThBemhEbzRoOGxqekJBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIxS0VlOEtkU1RRK2FsOHZvS1NobzNqQkxHNTErSW9ZSUJLOU1DeHJoRjlDM0lwV0p4VGhWQ25TZ1JMSCtZMkZYWTUrWTVzeHZpVVhVeXBac2RQdVRCdz09In0sIm1lIjp7ImlkIjoiMjY1OTkzNzAyNDY4OjZAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxNDU5MTc3MzkwMjQ0MDQ6NkBsaWQifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjY1OTkzNzAyNDY4OjZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCU1VwM1VUbUg3MkdsVnpaMVRMb2ZwRW5qTUZXMDJBTDBGelNRSnlwM2Z0TyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIyNzk5ODg3LCJsYXN0UHJvcEhhc2giOiIxbE9TRUkifQ==",
  DELETED_LOG: toBool(process.env.DELETED_LOG) || false,
  DELETED_LOG_CHAT: process.env.DELETED_LOG_CHAT || false,
  REMOVEBG: process.env.REMOVEBG || false,
  DATABASE_URL: DATABASE_URL,
  STATUS_SAVER: toBool(process.env.STATUS_SAVER) || true,
  DATABASE:
    DATABASE_URL === "./assets/database.db"
      ? new Sequelize({
          dialect: "sqlite",
          storage: DATABASE_URL,
          logging: false,
        })
      : new Sequelize(DATABASE_URL, {
          dialect: "postgres",
          ssl: true,
          protocol: "postgres",
          dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
          },
          logging: false,
        }),
};
