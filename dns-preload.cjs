// Apply an OS-level environment value early when one is available.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { loadEnvConfig } = require("@next/env");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { configureMongoDns } = require("./mongodb-dns.cjs");

loadEnvConfig(process.cwd());
configureMongoDns();
