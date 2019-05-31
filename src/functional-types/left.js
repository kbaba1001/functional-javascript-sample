import Either from 'either'

// error case rale
export default class Left extends Either {
  map(_) {
    return this // noop
  }
  get value() {
    throw new TypeError("Can't extract the value of Left(a).")
  }
  getOrElse(other) {
    return other
  }
  ofElse(f) {
    return f(this._value)
  }
  chain(f) {
    return this
  }
  getOrElseThrow(a) {
    throw new Error(a)
  }
  filter(f) {
    return this
  }
  toString() {
    return `Either.Left(${this._value})`
  }
}
