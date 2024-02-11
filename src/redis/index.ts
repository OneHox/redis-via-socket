import Redis from "ioredis";

export default class RedisSingleton {
  private static instance: Redis | null = null;

  private constructor() {
    // Private constructor to prevent instantiation from outside
  }

  public static getInstance(): Redis {
    if (!RedisSingleton.instance) {
      // Create a new Redis instance if not already present
      RedisSingleton.instance = new Redis({
        // Add your Redis configuration here
        host: "localhost",
        port: 6379,
      });

      // Optional: Add any other initialization logic here
    }

    return RedisSingleton.instance;
  }
}
