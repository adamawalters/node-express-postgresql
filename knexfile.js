if (process.env.USER) require("dotenv").config();

const path = require("path");

const {
  DATABASE_PRODUCTION_URL, 
  DATABASE_DEVELOPMENT_URL
} = process.env;

const {NODE_ENV = "development" } = process.env;

const URL = NODE_ENV === "production" ? DATABASE_PRODUCTION_URL : DATABASE_DEVELOPMENT_URL; 


module.exports = {
  development: {
    client: "postgresql",
    connection: URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: "postgresql",
    connection: URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  test: {
    client: "postgresql",
    connection: URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },
};
