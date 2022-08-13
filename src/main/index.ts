import "dotenv/config";

import { ServerHelper } from "./server/server";

const serverHelper = new ServerHelper(3000);

((): void => {
  try {
    serverHelper.init();
    serverHelper.start();

    const exitSignals: Array<NodeJS.Signals> = ["SIGINT", "SIGTERM", "SIGQUIT"];

    for (const signal of exitSignals) {
      process.on(signal, async () => {
        try {
          console.info("Closing Express HTTP Server...");
          serverHelper.shutdown();
        } catch (error) {
          console.error(`App exited with error: ${error}`);
          process.exit(1);
        }
      });
    }
  } catch (error) {
    console.error(`App exited with error: ${error}`);
    process.exit(1);
  }
})();
