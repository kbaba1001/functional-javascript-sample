import {Maybe, Just, Nothing} from './functional-types/maybe.js'
import {Either, Left, Right} from './functional-types/either.js'
import IO from './functional-types/io.js'
import * as R from 'ramda'

export default function main() {
  console.log(R.prop('x', {x: 100}))
}
