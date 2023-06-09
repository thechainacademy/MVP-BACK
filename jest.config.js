import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

export default {
  // Other Jest configuration options...
  setupFilesAfterEnv: ["dotenv/config"],
};
