import Either from 'either'

// success case rale
export default class Right extends Either {
  map(f) {
    return Either.of(f(this._value))
  }
  get value() {
    return this._value
  }
  getOrElse(other) {
    return this._value
  }
  orElse(_) {
    return this
  }
  chain(f) {
    return f(this._value)
  }
  getOrElseThrow(_) {
    return this.value
  }
  filter(f) {
    return Either.fromNullable(f(this._value) ? this._value : null)
  }
  toString() {
    return `Either.Right(${this._value})`
  }
}
