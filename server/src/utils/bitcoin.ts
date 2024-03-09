
import path from "path";
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const rpcUser = process.env.BITCOIN_RPC_USER;
const rpcPass = process.env.BITCOIN_RPC_PASS;
const rpcUrl = process.env.BITCOIN_RPC_URL;
const rpcPort = process.env.BITCOIN_RPC_PORT;

const bitcoinAuth = {
  rpcUser,
  rpcPass,
  rpcPort,
  rpcUrl,
  bitcoinUrl: `http://${rpcUser}:${rpcPass}@${rpcUrl}:${rpcPort}/`
}

export default bitcoinAuth
