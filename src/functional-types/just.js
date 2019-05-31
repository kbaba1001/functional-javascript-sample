import Maybe from 'maybe'

export default class Just extends Maybe {
  constructor(value) {
    super()
    this._value = value
  }

  get value() {
    return this._value
  }

  map(f) {
    return Maybe.fromNullable(f(this._value))
  }

  getOrElse(_) {
    return this._value
  }

  filter(f) {
    Maybe.fromNullable(f(this._value) ? this._value : null)
  }

  chain(f) {
    return f(this._value)
  }

  toString() {
    return `Maybe.Just(${this._value})`
  }
}
