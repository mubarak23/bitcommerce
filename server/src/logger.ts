import { Logger } from "tslog";

const log: Logger = new Logger({
  name: "Bit Commerce Service", 
  maskValuesOfKeys: ['password', 'token', 'x-access-token']
})

export default log
