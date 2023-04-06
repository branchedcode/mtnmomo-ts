export type BaseUrlCategory = 'API' | 'PAYMENTS'

export type XTargetEnvironment = 'sandbox' | 'live'

export type EndpointCategory =
  | 'CREATE_SUBSCRIPTION'
  | 'FETCH_SUBSCRIPTION'
  | 'DELETE_SUBSCRIPTION'
  | 'MOBILE_CHECKOUT'
  | 'MOBILE_B2C'
  | 'MOBILE_B2B'
  | 'MOBILE_DATA'

export type Endpoints = {
  readonly [category in EndpointCategory]: {
    readonly baseUrlCategory: BaseUrlCategory
    readonly endpoint: string
  }
}

export interface CreateAccessToken {
  readonly expires_in: number
  readonly access_token: string
  readonly token_type: string
 }

export interface MomoClientOptions {
  readonly 'X-Target-Environment': XTargetEnvironment
  readonly 'Ocp-Apim-Subscription-Key': string
  readonly 'API-Key': string
  readonly 'X-Reference-Id': string
  readonly 'X-Callback-Url'?:string | undefined
}

export interface RequestToPayOptions{
  readonly 'amount':string
  readonly "currency":string
  readonly "externalId":string
  readonly "payer":{
    readonly "partyIdType":'MSISDN' | 'EMAIL' | 'PARTY_CODE'
    readonly "partyId":string
  }
  readonly "payerMessage":string
  readonly "payeeNote":string
}

export interface ICollection{
  requestToPay(options:RequestToPayOptions):Promise<void>
}
