const os = require("os");
const path = require("path");

const hostname = os.hostname();
const { version } = require(path.resolve(process.cwd(), "package.json"));
const { locale } = new Intl.DateTimeFormat().resolvedOptions();

module.exports = (_, res) => {
  const dateTime = new Date().toISOString();
  res.json({ hostname, version, dateTime, locale });
};
