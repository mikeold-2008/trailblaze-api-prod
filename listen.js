const app = require("./index");
const port = process.env.PORT || 9090;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
