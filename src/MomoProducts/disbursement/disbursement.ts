import {
  AccountBalanceData,
  DepositData,
  DepositOptions,
  BasicUserInfo,
  IDisbursement,
  MomoClientOptions,
  MomoResponse,
  RefundData,
  RefundOptions,
  TransferData,
  TransferStatus,
  TransferOptions,
  DepositStatus,
  RefundStatus,
  AccountHolder,
  AccountHolderStatus,
} from '../../types'
import { MomoProduct } from '../momoProduct'
import { DisbursementEndPoints } from './endpoints'

export class Disbursement extends MomoProduct implements IDisbursement {
  public constructor(options: MomoClientOptions) {
    super()
    this['Ocp-Apim-Subscription-Key'] = options['Ocp-Apim-Subscription-Key']
    this['X-Reference-Id'] = options['X-Reference-Id']
    this['API-Key'] = options['API-Key']
    this['X-Target-Environment'] = options['X-Target-Environment']
    this['X-Callback-Url'] = options['X-Callback-Url']
  }

  public deposit = async (
    options: DepositOptions
  ): Promise<MomoResponse<DepositData>> => {
    const endPoint = `${this.generateUrl()}/${DisbursementEndPoints.DEPOSIT}`

    return this.makeMomoPostRequest(endPoint, options)
  }

  public getAccountBalance = async (): Promise<
    MomoResponse<AccountBalanceData>
  > => {
    const endPoint = `${this.generateUrl()}/${
      DisbursementEndPoints.GET_ACCOUNT_BALANCE
    }`
    return this.makeMomoGetRequest(endPoint)
  }

  public getBasicUserInfo = async (
    accountHolderMSISDN: string
  ): Promise<MomoResponse<BasicUserInfo>> => {
    const endPoint = `${this.generateUrl()}/${
      DisbursementEndPoints.GET_BASIC_USER_INFO
    }/${accountHolderMSISDN}/basicuserinfo`

    return this.makeMomoGetRequest(endPoint)
  }

  public refund = async (
    options: RefundOptions
  ): Promise<MomoResponse<RefundData>> => {
    const endPoint = `${this.generateUrl()}/${DisbursementEndPoints.REFUND}`
    return this.makeMomoPostRequest(endPoint, options)
  }

  public transfer = async (
    options: TransferOptions
  ): Promise<MomoResponse<TransferData>> => {
    const endPoint = `${this.generateUrl()}/${DisbursementEndPoints.TRANSFER}`
    return this.makeMomoPostRequest(endPoint, options)
  }

  public getDepositStatus = async (
    referenceId: string
  ): Promise<MomoResponse<DepositStatus>> => {
    const endPoint = `${this.generateUrl()}/${
      DisbursementEndPoints.GET_DEPOSIT_STATUS
    }/${referenceId}`

    return this.makeMomoGetRequest(endPoint)
  }

  public getTransferStatus = async (
    referenceId: string
  ): Promise<MomoResponse<TransferStatus>> => {
    const endPoint = `${this.generateUrl()}/${
      DisbursementEndPoints.GET_TRANSFER_STATUS
    }/${referenceId}`

    return this.makeMomoGetRequest(endPoint)
  }

  public getRefundStatus = async (
    referenceId: string
  ): Promise<MomoResponse<RefundStatus>> => {
    const endPoint = `${this.generateUrl()}/${
      DisbursementEndPoints.GET_TRANSFER_STATUS
    }/${referenceId}`

    return this.makeMomoGetRequest(endPoint)
  }

  public validateAccountHolderStatus = (
    options: AccountHolder
  ): Promise<MomoResponse<AccountHolderStatus>> => {
    const accountHolderIdType = options.accountHolderIdType.toLowerCase()
    const accountHolderId = options.accountHolderId
    const endPoint = `${this.generateUrl()}/${
      DisbursementEndPoints.VALIDATE_ACCOUNT_HOLDER_STATUS
    }/${accountHolderIdType}/${accountHolderId}/active`

    return this.makeMomoGetRequest(endPoint)
  }
}
