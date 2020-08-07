export const isEmail = email =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)

export const isLongerThan = length => stringOrArray => stringOrArray.length > length

export default {
  isEmail,
  isLongerThan
}
