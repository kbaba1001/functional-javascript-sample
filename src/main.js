// import {Maybe, Just, Nothing} from './functional-types/maybe.js'
// import {Either, Left, Right} from './functional-types/either.js'
import IO from './functional-types/io.js'
import * as R from 'ramda'

export default function main() {
  const read = function (document, id) {
    return function () {
      return document.querySelector(`${id}`).innerHTML
    }
  }

  const write = function(document, id) {
    return function(val) {
      return document.querySelector(`${id}`).innerHTML = val
    }
  }

  const readDom  = R.partial(read, [document])
  const writeDom = R.partial(write, [document])
  const toUpperCase = (str) => {
    return str.toUpperCase()
  }

  // Run program
  const changeToStartCase =
    IO.from(readDom('#student-name')).
      map(toUpperCase).
      map(writeDom('#student-name'))

  // this will start case the content within the DOM element
  changeToStartCase.run()
}
