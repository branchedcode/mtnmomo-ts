import {
  MomoClientOptions,
  ICollection,
  RequestToPayOptions,
  MomoResponse,
  RequestToPayData,
  RequestToPayTransactionStatus,
  AccountBalanceData,
  BasicUserInfo,
  AccountHolder,
  AccountHolderStatus,
  RequestToWithdrawData,
  RequestToWithdrawOptions,
  RequestToWithdrawTransactionStatus,
} from '../../types'
import { CollectionEndPoints } from './endpoints'
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

    return this.makeMomoPostRequest(requestToPayEndPoint, options)
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

    return this.makeMomoPostRequest(endPoint, options)
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
