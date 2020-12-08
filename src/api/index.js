const apis = require.context("./modules", false, /\.js$/);
const api = Object.create(null);

apis.keys().forEach(m => {
  let moduleName = m.replace(/(.*\/)*([^.]+).*/gi, "$2");
  api[moduleName] = apis(m);
});
export {api};
