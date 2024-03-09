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

