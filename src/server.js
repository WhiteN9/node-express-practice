const { PORT = 8080 } = process.env;

const app = require("./app");

const listener = () => console.log(`Hello, we are at ${PORT} port`);
app.listen(PORT, listener);
