import Maybe from 'maybe'

export default class Nothing extends Maybe {
  map(f) {
    return this
  }
  get value() {
    throw new TypeError("Can't extract the value of a Nothing")
  }
  getOrElse(other) {
    return other
  }
  filter(f) {
    return this
  }
  chain(f) {
    return this
  }
  toString() {
    return 'Maybe.Nothing'
  }
}
