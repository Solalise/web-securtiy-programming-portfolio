// Node의 --require preload 파일이므로 CommonJS 형식을 사용한다.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const dns = require("node:dns");

if (typeof process.env.VERCEL === "undefined") {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}
