import app from "./app";
import { initDB } from "./config/db";

const port = 5000;
const main = async () => {
  try {
    await initDB();
    app.listen(port, () => {
      console.log(`Server is running on port:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
main();
