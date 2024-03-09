// lightningService
import { AddInvoiceResponse } from '@radar/lnrpc'
import lndRPCConnect from '../utils/lnd'
export const generateNewInvoice = async (amount: number, expired?: string ) : Promise<AddInvoiceResponse> => {
    const rpc = await lndRPCConnect

    const invoice = await rpc.addInvoice({
      value: amount.toString(),
      expiry: expired
    })
    return invoice
} 


// using websocket to listen for invoice payment
