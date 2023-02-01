import { test, expect, describe } from '@jest/globals'

import { formatPhoneNumber, NI } from '.'

describe('formatPhoneNumber', () => {
  test('it returns an international formatted phone number', () => {
    const phoneNumber = formatPhoneNumber('0772111111')
    expect(phoneNumber).toEqual('+256772111111')
  })
})

describe('NI', () => {
  test('it should throw an error coz its not implemented', () => {
    expect(() => NI()).toThrow('[Not implemented]')
  })
})
