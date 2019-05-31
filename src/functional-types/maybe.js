export default class Maybe {
  static just(a) {
    return new Just(a)
  }
  static nothing() {
    return new Nothing()
  }
  static fromNullable(a) {
    return a !== null ? Maybe.just(a) : Maybe.nothing()
  }
  static of(a) {
    return just(a)
  }
  get isNothing() {
    return false
  }
  get isJust() {
    return false
  }
}
