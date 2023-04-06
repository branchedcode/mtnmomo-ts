import axios from 'axios'

import { XTargetEnvironment } from '../types'
import { isNullOrUndefined } from '../utils'

export abstract class MomoProduct {
  private readonly BASE_URL = 'https://momodeveloper.mtn.com'
  private readonly SANDBOX_BASE_URL = 'https://sandbox.momodeveloper.mtn.com'
  protected readonly momoProduct: string
  protected 'X-Target-Environment': XTargetEnvironment
  protected 'Ocp-Apim-Subscription-Key': string
  protected 'X-Reference-Id': string
  protected 'API-Key': string
  protected 'X-Callback-Url': string | undefined
  protected authorizationToken: string | undefined
  protected tokenExpiry: Date | undefined

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

  private isTokenExpired(): boolean {
    const now = new Date()
    const timeLeft = this.tokenExpiry
      ? this.tokenExpiry.getTime() - now.getTime()
      : 0
    return timeLeft <= 60000
  }

  protected async getAuthorizationToken(): Promise<void> {
    if (!isNullOrUndefined(this.authorizationToken) && !this.isTokenExpired()) {
      return
    }
    const base64String = Buffer.from(
      `${this['X-Reference-Id']}:${this['API-Key']}`
    ).toString('base64')

    const tokenEndpoint = `${this.generateUrl()}/token/`

    const response = await axios({
      method: 'POST',
      url: tokenEndpoint,
      headers: {
        Authorization: `Basic ${base64String}`,
        'Ocp-Apim-Subscription-Key': this['Ocp-Apim-Subscription-Key'],
      },
    })

    const { access_token } = response.data
    this.authorizationToken = `Bearer ${access_token}`
    this.tokenExpiry = new Date(Date.now() + 3600000)
  }
}
