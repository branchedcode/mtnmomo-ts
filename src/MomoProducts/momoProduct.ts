import axios from 'axios'

import { XTargetEnvironment, CreateAccessToken } from '../types'
import { isNullOrUndefined } from '../utils'

export abstract class MomoProduct {
  private readonly BASE_URL = 'https://momodeveloper.mtn.com'
  private readonly SANDBOX_BASE_URL = 'https://sandbox.momodeveloper.mtn.com'
  protected TOKEN_EXPIRY_MS = 3600
  protected readonly momoProduct: string
  protected 'X-Target-Environment': XTargetEnvironment
  protected 'Ocp-Apim-Subscription-Key': string
  protected 'X-Reference-Id': string
  protected 'API-Key': string
  protected 'X-Callback-Url': string|undefined
  protected authorizationToken: string | undefined
  protected authorizationTokenLastUpdated: Date | undefined

  protected constructor() {
    this.momoProduct = this.constructor.name.toLowerCase()
  }

  protected generateUrl(): string {
    return `${
      this['X-Target-Environment'] === 'sandbox'
        ? this.SANDBOX_BASE_URL
        : this.BASE_URL
    }/${this.momoProduct}`
  }

  private checkIfAuthorizationTokenIsExpired(): boolean {
    if (isNullOrUndefined(this.authorizationTokenLastUpdated)) {
      return true
    }

    if (
      this.authorizationTokenLastUpdated.getTime() + this.TOKEN_EXPIRY_MS >
      new Date(Date.now()).getTime()
    ) {
      return false
    }
    return true
  }

  protected async getAuthorizationToken(): Promise<string> {
    const tokenIsExpired = this.checkIfAuthorizationTokenIsExpired()

    if (
      tokenIsExpired === false &&
      this.authorizationToken !== undefined &&
      this.authorizationTokenLastUpdated !== undefined
    ) {
      return this.authorizationToken
    }

    const base64String = Buffer.from(
      `${this['X-Reference-Id']}:${this['API-Key']}`
    ).toString('base64')

    const tokenEndpoint = `${this.generateUrl()}/token/`

    const response = await axios(tokenEndpoint, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${base64String}`,
        'Ocp-Apim-Subscription-Key': this['Ocp-Apim-Subscription-Key'],
      },
    })

    const { access_token } = (await response.data) as CreateAccessToken

    return access_token
  }
}
