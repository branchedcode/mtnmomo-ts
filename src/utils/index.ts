/**
 * @param value Any value
 * @returns True if value is either null or undefined.
 */
export function isNullOrUndefined<T>(
  value: T | undefined | null
): value is undefined | null {
  return value === undefined || value === null
}

/**
 * @returns `Error`
 */
export const NI = (): Error => {
  throw new Error('[Not implemented]')
}

/**
 * @returns `Error`
 */
export const NOOP = (): void => {
  console.warn('[No operation]')
}

/**
 * Returns true if the input string is a UUID.
 * @param input The input string.
 * @returns True if the input string matches the UUID format.
 */
export function isUUID(input: string): boolean {
  return !!input.match(/^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/i)
}

/**
 * Returns true if the input is an object.
 * @param object The candidate object.
 * @returns True if the input is a non-null non-undefined object.
 */
export function isObject(object: unknown): object is Record<string, unknown> {
  return !isNullOrUndefined(object) && typeof object === 'object'
}

/**
 * Returns true if the input array is an array of strings.
 * @param array Input array.
 * @returns True if the input array is an array of strings.
 */
export function isStringArray(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  array: ReadonlyArray<any>
): array is ReadonlyArray<string> {
  return array.every(e => typeof e === 'string')
}

/**
 * Returns an international string format of phone number eg input => "0772111111", output => "+256772111111".
 * @param phoneNumber The phone number to format.
 * @returns string.
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  const phoneNumberToArray = [...phoneNumber]
  const [, ...rest] = phoneNumberToArray
  const newPhoneNumber = rest.join('')
  return `+256${newPhoneNumber}`
}
