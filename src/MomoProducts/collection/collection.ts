import axios from 'axios'
import { v4 as uuid4 } from 'uuid'

import {
  MomoClientOptions,
  ICollection,
  RequestToPayOptions,
  MomoResponse,
  RequestToPayData,
  RequestToPayHeaders,
  RequestToPayTransactionStatus,
  AccountBalanceData,
  BasicUserInfo,
  AccountHolder,
  AccountHolderStatus,
  RequestToWithdrawData,
  RequestToWithdrawOptions,
  RequestToWithdrawHeaders,
  RequestToWithdrawTransactionStatus,
} from '../../types'
import { CollectionEndPoints } from './endpoints'
import { isNullOrUndefined } from '../../utils'
import { MomoProduct } from '../momoProduct'

export class Collection extends MomoProduct implements ICollection {
  public constructor(options: MomoClientOptions) {
    super()
    this['Ocp-Apim-Subscription-Key'] = options['Ocp-Apim-Subscription-Key']
    this['X-Reference-Id'] = options['X-Reference-Id']
    this['API-Key'] = options['API-Key']
    this['X-Target-Environment'] = options['X-Target-Environment']
    this['X-Callback-Url'] = options['X-Callback-Url']
  }

  public requestToPay = async (
    options: RequestToPayOptions
  ): Promise<MomoResponse<RequestToPayData>> => {
    const requestToPayEndPoint = `${this.generateUrl()}/${
      CollectionEndPoints.REQUEST_TO_PAY
    }`

    const referenceId = uuid4()

    try {
      await this.getAuthorizationToken()

      let requestToPayHeaders: RequestToPayHeaders = {
        Authorization: this.authorizationToken as string,
        'Content-Type': 'application/json',
        'X-Target-Environment': this['X-Target-Environment'],
        'X-Reference-Id': referenceId,
        'Ocp-Apim-Subscription-Key': this['Ocp-Apim-Subscription-Key'],
      }

      if (
        !isNullOrUndefined(this['X-Callback-Url']) &&
        this['X-Target-Environment'] === 'live'
      ) {
        requestToPayHeaders = {
          ...requestToPayHeaders,
          'X-Callback-Url': this['X-Callback-Url'],
        }
      }

      const response = await axios(requestToPayEndPoint, {
        method: 'POST',
        data: options,
        headers: requestToPayHeaders,
      })

      return {
        data: {
          status_code: response.status,
          message: response.statusText,
          referenceId,
        },
        error: null,
      }
    } catch (error: any) {
      const err = error.response ? error.response : error
      return {
        data: null,
        error: {
          status_code: err.status,
          status_text: err.statusText,
          message: err.message,
        },
      }
    }
  }

  public requestToPayTransactionStatus = async (
    referenceId: string
  ): Promise<MomoResponse<RequestToPayTransactionStatus>> => {
    const endPoint = `${this.generateUrl()}/${
      CollectionEndPoints.REQUEST_TO_PAY_TRANSACTION_STATUS
    }/${referenceId}`

    return this.makeMomoGetRequest(endPoint)
  }

  public getBasicUserInfo = async (
    accountHolderMSISDN: string
  ): Promise<MomoResponse<BasicUserInfo>> => {
    const endPoint = `${this.generateUrl()}/${
      CollectionEndPoints.GET_BASIC_USER_INFO
    }/${accountHolderMSISDN}/basicuserinfo`

    return this.makeMomoGetRequest(endPoint)
  }

  public getAccountBalance = async (): Promise<
    MomoResponse<AccountBalanceData>
  > => {
    const endPoint = `${this.generateUrl()}/${
      CollectionEndPoints.GET_ACCOUNT_BALANCE
    }`

    return this.makeMomoGetRequest(endPoint)
  }

  public validateAccountHolderStatus = async (
    options: AccountHolder
  ): Promise<MomoResponse<AccountHolderStatus>> => {
    const accountHolderIdType = options.accountHolderIdType.toLowerCase()
    const accountHolderId = options.accountHolderId
    const endPoint = `${this.generateUrl()}/${
      CollectionEndPoints.VALIDATE_ACCOUNT_HOLDER_STATUS
    }/${accountHolderIdType}/${accountHolderId}/active`

    return this.makeMomoGetRequest(endPoint)
  }

  public requestToWithdraw = async (
    options: RequestToWithdrawOptions
  ): Promise<MomoResponse<RequestToWithdrawData>> => {
    const endPoint = `${this.generateUrl()}/${
      CollectionEndPoints.REQUEST_TO_WITHDRAW
    }`

    const referenceId = uuid4()

    try {
      await this.getAuthorizationToken()

      let requestToWithdrawHeaders: RequestToWithdrawHeaders = {
        Authorization: this.authorizationToken as string,
        'Content-Type': 'application/json',
        'X-Target-Environment': this['X-Target-Environment'],
        'X-Reference-Id': referenceId,
        'Ocp-Apim-Subscription-Key': this['Ocp-Apim-Subscription-Key'],
      }

      if (
        !isNullOrUndefined(this['X-Callback-Url']) &&
        this['X-Target-Environment'] === 'live'
      ) {
        requestToWithdrawHeaders = {
          ...requestToWithdrawHeaders,
          'X-Callback-Url': this['X-Callback-Url'],
        }
      }

      const response = await axios(endPoint, {
        method: 'POST',
        data: options,
        headers: requestToWithdrawHeaders,
      })

      return {
        data: {
          status_code: response.status,
          message: response.statusText,
          referenceId,
        },
        error: null,
      }
    } catch (error: any) {
      const err = error.response ? error.response : error
      return {
        data: null,
        error: {
          status_code: err.status,
          status_text: err.statusText,
          message: err.message,
        },
      }
    }
  }

  public requestToWithdrawTransactionStatus = async (
    referenceId: string
  ): Promise<MomoResponse<RequestToWithdrawTransactionStatus>> => {
    const endPoint = `${this.generateUrl()}/${
      CollectionEndPoints.REQUEST_TO_WITHDRAW_TRANSACTION_STATUS
    }/${referenceId}`
    return this.makeMomoGetRequest(endPoint)
  }
}
