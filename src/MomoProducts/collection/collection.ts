import axios from 'axios';

import {
  MomoClientOptions,
  ICollection,
  RequestToPayOptions,
} from '../../types'
import {CollectionEndPoints} from './endpoints'
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

  public async requestToPay(options: RequestToPayOptions): Promise<void> {
   const requestToPayEndPoint=`${this.generateUrl()}/${CollectionEndPoints.REQUEST_TO_PAY}`

   await axios(requestToPayEndPoint,{
    method:"POST",
    data:options,
    headers:{
     Authorization:"",
     "X-Callback-Url":this['X-Callback-Url'],
     "Content-Type":"application/json",
     "X-Target-Environment":this['X-Target-Environment'],
     //TODO revisit this x-reference-id(autogenerate UUID??)
     "X-Reference-Id":this['X-Reference-Id'],
     "Ocp-Apim-Subscription-Key":this['Ocp-Apim-Subscription-Key']
    }
   })
  }

}
