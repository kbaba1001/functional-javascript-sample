export default class Either {
  constructor(value) {
    this._value = value
  }
  get value() {
    return this._value
  }
  static left(a) {
    return new Left(a)
  }
  static right(a) {
    return new Right(a)
  }
  static fromNullable(val) {
    return val !== null && val !== undefined ? Either.right(val) : Either.left(val)
  }
  static of(a) {
    return Either.right(a)
  }
}
