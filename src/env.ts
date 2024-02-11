import "dotenv/config";

export const ENV = () => process.env.NODE_ENV || "development";
export const PORT = process.env.PORT ? +process.env.PORT : 8080;
