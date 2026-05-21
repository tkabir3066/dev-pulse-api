import app from "./app";

const port = 5000;
const main = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
main();
