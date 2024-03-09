import createLnRpc from '@radar/lnrpc';
import path from "path";

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const lndRPCConnect =  createLnRpc({
  server: process.env.LND_RPC_URL,
  tls: process.env.LND_MACROON_PATH,
  macaroonPath: process.env.LND_MACROON_PATH
})

export default lndRPCConnect