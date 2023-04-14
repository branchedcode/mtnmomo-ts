import {
  AccountBalanceData,
  BasicUserInfo,
  IRemittance,
  MomoClientOptions,
  MomoResponse,
  TransferData,
  TransferStatus,
  TransferOptions,
  AccountHolder,
  AccountHolderStatus,
} from '../../types'
import { MomoProduct } from '../momoProduct'
import { RemittanceEndPoints } from './endpoints'

export class Remittance extends MomoProduct implements IRemittance {
  private constructor(options: MomoClientOptions) {
    super()
    this['Ocp-Apim-Subscription-Key'] = options['Ocp-Apim-Subscription-Key']
    this['X-Reference-Id'] = options['X-Reference-Id']
    this['API-Key'] = options['API-Key']
    this['X-Target-Environment'] = options['X-Target-Environment']
    this['X-Callback-Url'] = options['X-Callback-Url']
  }

  public getAccountBalance = async (): Promise<
    MomoResponse<AccountBalanceData>
  > => {
    const endPoint = `${this.generateUrl()}/${
      RemittanceEndPoints.GET_ACCOUNT_BALANCE
    }`

    return this.makeMomoGetRequest(endPoint)
  }

  public getBasicUserInfo = async (
    accountHolderMSISDN: string
  ): Promise<MomoResponse<BasicUserInfo>> => {
    const endPoint = `${this.generateUrl()}/${
      RemittanceEndPoints.GET_BASIC_USER_INFO
    }/${accountHolderMSISDN}/basicuserinfo`

    return this.makeMomoGetRequest(endPoint)
  }

  public transfer = async (
    options: TransferOptions
  ): Promise<MomoResponse<TransferData>> => {
    const endPoint = `${this.generateUrl()}/${RemittanceEndPoints.TRANSFER}`

    return this.makeMomoPostRequest(endPoint, options)
  }

  public getTransferStatus = async (
    referenceId: string
  ): Promise<MomoResponse<TransferStatus>> => {
    const endPoint = `${this.generateUrl()}/${
      RemittanceEndPoints.GET_TRANSFER_STATUS
    }/${referenceId}`
    return this.makeMomoGetRequest(endPoint)
  }

  public validateAccountHolderStatus = async (
    options: AccountHolder
  ): Promise<MomoResponse<AccountHolderStatus>> => {
    const accountHolderIdType = options.accountHolderIdType.toLowerCase()
    const accountHolderId = options.accountHolderId
    const endPoint = `${this.generateUrl()}/${
      RemittanceEndPoints.VALIDATE_ACCOUNT_HOLDER_STATUS
    }/${accountHolderIdType}/${accountHolderId}/active`

    return this.makeMomoGetRequest(endPoint)
  }
}
