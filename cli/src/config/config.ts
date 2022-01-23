import Configstore from "configstore";
const packageJson = require('../../package.json');

const config = new Configstore(packageJson.name, {
  accounts: [],
  stats: {},
  orders: {},
});

export default config;