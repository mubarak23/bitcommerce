import axios, { AxiosResponse } from 'axios'
import bitcoinAuth from '../utils/bitcoin'
import * as Utils from '../utils/core'
import { ServerError } from '../utils/error-response-types'

const headers = {
  'Content-Type': 'application/json',
}


export const createWallet = async (name: string): Promise<AxiosResponse> => {

  const payload = {
    jsonrpc: '1.0',
    id: 'curltext',
    method: 'createwallet',
    params: [name, false, false, '', false, true, true],
}; 

  try {

    const response: AxiosResponse<any> = await axios.post(bitcoinAuth.bitcoinUrl, payload, {
      headers
    })

    return response

  } catch(e) {
    const errorMessage = Utils.handleAxiosRequestError(e)
    console.log(`e handleAxiosRequestError message: `, errorMessage)
    console.log(`e message: `, e.message)
    console.log(e.stack)

    throw new ServerError('An error occurred. Try again')
  }

}


export const getWalletBalance = async (wallet: string): Promise<AxiosResponse> => {

  const payload = {
      jsonrpc: '1.0',
      id: 'curltext',
      method: 'getbalance',
      params: [],
  };

  try {

    const response: AxiosResponse<any> = await axios.post(`${bitcoinAuth.bitcoinUrl}/wallet/${wallet}`, payload, {
      headers
    })

    return response

  } catch(e) {
    const errorMessage = Utils.handleAxiosRequestError(e)
    console.log(`e handleAxiosRequestError message: `, errorMessage)
    console.log(`e message: `, e.message)
    console.log(e.stack)

    throw new ServerError('An error occurred. Try again')
  }

}



export const getAllWallets = async (): Promise<AxiosResponse> => {

  const payload = {
      jsonrpc: '1.0',
      id: 'curltext',
      method: 'listwallets',
      params: [],
  };

  try {

    const response: AxiosResponse<any> = await axios.post(bitcoinAuth.bitcoinUrl, payload, {
      headers
    })

    return response

  } catch(e) {
    const errorMessage = Utils.handleAxiosRequestError(e)
    console.log(`e handleAxiosRequestError message: `, errorMessage)
    console.log(`e message: `, e.message)
    console.log(e.stack)

    throw new ServerError('An error occurred. Try again')
  }

}


export const getWalletTransactions = async (wallet: string): Promise<AxiosResponse> => {

  const payload = {
      jsonrpc: '1.0',
      id: 'curltext',
      method: 'listtransactions',
      params: ['*', 100],
  };

  try {

    const response: AxiosResponse<any> = await axios.post(`${bitcoinAuth.bitcoinUrl}/wallet/${wallet}`, payload, {
      headers
    })

    return response

  } catch(e) {
    const errorMessage = Utils.handleAxiosRequestError(e)
    console.log(`e handleAxiosRequestError message: `, errorMessage)
    console.log(`e message: `, e.message)
    console.log(e.stack)

    throw new ServerError('An error occurred. Try again')
  }

}


export const getNewAddress = async (wallet: string, type: string, label: string): Promise<AxiosResponse> => {

  let typeSelect: string = ""

  switch(type) {
    case 'p2pkh': typeSelect = 'legacy';
    break;
    case 'p2sh': typeSelect = 'p2sh-segwit';
    break;
    default: typeSelect = 'bech32';
}

  const payload = {
      jsonrpc: '1.0',
      id: 'curltext',
      method: 'getnewaddress',
      params: [label, typeSelect],
  };

  try {

    const response: AxiosResponse<any> = await axios.post(`${bitcoinAuth.bitcoinUrl}/wallet/${wallet}`, payload, {
      headers
    })

    return response

  } catch(e) {
    const errorMessage = Utils.handleAxiosRequestError(e)
    console.log(`e handleAxiosRequestError message: `, errorMessage)
    console.log(`e message: `, e.message)
    console.log(e.stack)

    throw new ServerError('An error occurred. Try again')
  }

}

export const getTransaction = async (wallet: string, transactionId: string): Promise<AxiosResponse> => {

  const payload = {
      jsonrpc: '1.0',
      id: 'curltext',
      method: 'gettransaction',
      params: [transactionId],
  };

  try {

    const response: AxiosResponse<any> = await axios.post(`${bitcoinAuth.bitcoinUrl}/wallet/${wallet}`, payload, {
      headers
    })

    return response

  } catch(e) {
    const errorMessage = Utils.handleAxiosRequestError(e)
    console.log(`e handleAxiosRequestError message: `, errorMessage)
    console.log(`e message: `, e.message)
    console.log(e.stack)

    throw new ServerError('An error occurred. Try again')
  }

}


export const decodeTransaction = async ( transactionHex: string): Promise<AxiosResponse> => {

  const payload = {
      jsonrpc: '1.0',
      id: 'curltext',
      method: 'decoderawtransaction',
      params: [transactionHex],
  };

  try {

    const response: AxiosResponse<any> = await axios.post(`${bitcoinAuth.bitcoinUrl}`, payload, {
      headers
    })

    return response

  } catch(e) {
    const errorMessage = Utils.handleAxiosRequestError(e)
    console.log(`e handleAxiosRequestError message: `, errorMessage)
    console.log(`e message: `, e.message)
    console.log(e.stack)

    throw new ServerError('An error occurred. Try again')
  }

}

export const getFeeEstimate = async ( target: number): Promise<AxiosResponse> => {

  const payload = {
      jsonrpc: '1.0',
      id: 'curltext',
      method: 'estimatesmartfee',
      params: [target],
  };

  try {

    const response: AxiosResponse<any> = await axios.post(`${bitcoinAuth.bitcoinUrl}`, payload, {
      headers
    })

    return response

  } catch(e) {
    const errorMessage = Utils.handleAxiosRequestError(e)
    console.log(`e handleAxiosRequestError message: `, errorMessage)
    console.log(`e message: `, e.message)
    console.log(e.stack)

    throw new ServerError('An error occurred. Try again')
  }

}

export const setFeeOnTransaction = async (fee: number, wallet: string): Promise<AxiosResponse> => {

  const payload = {
      jsonrpc: '1.0',
      id: 'curltext',
      method: 'settxfee',
      params: [fee],
  };

  try {

    const response: AxiosResponse<any> = await axios.post(`${bitcoinAuth.bitcoinUrl}/wallet/${wallet}`, payload, {
      headers
    })

    return response

  } catch(e) {
    const errorMessage = Utils.handleAxiosRequestError(e)
    console.log(`e handleAxiosRequestError message: `, errorMessage)
    console.log(`e message: `, e.message)
    console.log(e.stack)

    throw new ServerError('An error occurred. Try again')
  }

}


export const createNewTransaction = async (address: string, wallet: string, amount: number, feerate: 1): Promise<AxiosResponse> => {

  const payload = {
      jsonrpc: '1.0',
      id: 'curltext',
      method: 'sendtoaddress',
      params: [address, amount, '', '', false, true, null, "unset", null, feerate],
  };

  try {

    const response: AxiosResponse<any> = await axios.post(`${bitcoinAuth.bitcoinUrl}/wallet/${wallet}`, payload, {
      headers
    })

    return response

  } catch(e) {
    const errorMessage = Utils.handleAxiosRequestError(e)
    console.log(`e handleAxiosRequestError message: `, errorMessage)
    console.log(`e message: `, e.message)
    console.log(e.stack)

    throw new ServerError('An error occurred. Try again')
  }

}


export const listUnspentTransactioon = async (): Promise<AxiosResponse> => {

  const payload = {
      jsonrpc: '1.0',
      id: 'curltext',
      method: 'listunspent',
      params: [],
  };

  try {

    const response: AxiosResponse<any> = await axios.post(`${bitcoinAuth.bitcoinUrl}`, payload, {
      headers
    })

    return response

  } catch(e) {
    const errorMessage = Utils.handleAxiosRequestError(e)
    console.log(`e handleAxiosRequestError message: `, errorMessage)
    console.log(`e message: `, e.message)
    console.log(e.stack)

    throw new ServerError('An error occurred. Try again')
  }

}
