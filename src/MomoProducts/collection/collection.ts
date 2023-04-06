import axios from 'axios'
import { v4 as uuid4 } from 'uuid'

import {
  MomoClientOptions,
  ICollection,
  RequestToPayOptions,
  RequestToPayResponse,
  RequestToPayHeaders,
} from '../../types'
import { CollectionEndPoints } from './endpoints'
import { MomoProduct } from '../momoProduct'
import { isNullOrUndefined } from '../../utils'

export class Collection extends MomoProduct implements ICollection {
  public constructor(options: MomoClientOptions) {
    super()
    this['Ocp-Apim-Subscription-Key'] = options['Ocp-Apim-Subscription-Key']
    this['X-Reference-Id'] = options['X-Reference-Id']
    this['API-Key'] = options['API-Key']
    this['X-Target-Environment'] = options['X-Target-Environment']
    this['X-Callback-Url'] = options['X-Callback-Url']
  }

  public async requestToPay(
    options: RequestToPayOptions
  ): Promise<RequestToPayResponse> {
    const requestToPayEndPoint = `${this.generateUrl()}/${
      CollectionEndPoints.REQUEST_TO_PAY
    }`

    const referenceId = uuid4()

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

    try {
      await this.getAuthorizationToken()
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
        error: { status_code: err.status, message: err.statusText },
      }
    }
  }
}
