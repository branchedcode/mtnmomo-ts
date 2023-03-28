import {MomoClientOptions,ICollection} from '../types'
import {MomoProduct} from './momoProduct'

export class Collection extends MomoProduct implements ICollection{

 public constructor(options:MomoClientOptions){
  super()
  this["Ocp-Apim-Subscription-Key"]=options['Ocp-Apim-Subscription-Key']
  this["X-Reference-Id"]=options["X-Reference-Id"]
  this["API-Key"]=options["API-Key"]
  this["X-Target-Environment"]=options["X-Target-Environment"]
 }
}