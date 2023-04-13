import axios from 'axios'
import { v4 as uuid4 } from 'uuid'

import {
  AccountBalanceData,
  DepositData,
  DepositHeaders,
  DepositOptions,
  IDisbursement,
  MomoClientOptions,
  MomoResponse,
} from '../../types'
import { isNullOrUndefined } from '../../utils'
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
    const referenceId = uuid4()

    try {
      await this.getAuthorizationToken()

      let depositHeaders: DepositHeaders = {
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
        depositHeaders = {
          ...depositHeaders,
          'X-Callback-Url': this['X-Callback-Url'],
        }
      }

      const response = await axios(endPoint, {
        method: 'POST',
        data: options,
        headers: depositHeaders,
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

  public getAccountBalance = async (): Promise<
    MomoResponse<AccountBalanceData>
  > => {
    const endPoint = `${this.generateUrl()}/${
      DisbursementEndPoints.GET_ACCOUNT_BALANCE
    }`
    return this.makeMomoGetRequest(endPoint)
  }
}
