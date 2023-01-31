export type BaseUrlCategory = 'API' | 'PAYMENTS'

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
