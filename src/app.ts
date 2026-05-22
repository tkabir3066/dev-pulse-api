import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import { AuthRoutes } from "./modules/auth/auth.route";

const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to the DevPulse server" });
});

app.use("/api/auth", AuthRoutes);
export default app;
