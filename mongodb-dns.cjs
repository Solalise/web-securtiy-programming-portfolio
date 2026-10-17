// CommonJS keeps this module usable from Node preloads, Next.js, and .mjs scripts.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const dns = require("node:dns");

function configureMongoDns() {
  const configured = process.env.MONGODB_DNS_SERVERS?.trim();
  if (!configured) return false;

  const servers = configured.split(/[,\s]+/).filter(Boolean);
  if (!servers.length) return false;

  dns.setServers(servers);
  return true;
}

module.exports = { configureMongoDns };
