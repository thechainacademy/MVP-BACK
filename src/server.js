import { app } from "./index.js";
import "dotenv/config";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App up and running at http://localhost:${PORT}`);
});
