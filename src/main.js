import Maybe from './functional-types/maybe.js'
import Either from './functional-types/either.js'
// import IO from './functional-types/io.js'
import * as R from 'ramda'

export default function main() {
  // data
  const db = {
    students: {
      '444-44-4444': {
        ssn: '444-44-4444',
        firstname: 'Alonzo',
        lastname: 'Church'
      },
      '444444444': {
        ssn: '444-44-4444',
        firstname: 'Alonzo',
        lastname: 'Church'
      },
    },
    find: function (ssn) {
      return this.students[ssn]
    }
  }


  const validLength = (len, str) => {
    return str.length === len
  }

  const checkLengthSsn = (ssn) => {
    return validLength(9, ssn) ? Either.right(ssn) : Either.left('Invalid SSN')
  }

  const find = R.curry((db, id) => db.find(id))

  const safeFindObject = R.curry((db, id) => {
    const val = find(db, id)
    return val ? Either.right(val) : Either.left(`Object not foundwith ID: ${id}`)
  })

  const findStudent = safeFindObject(db)

  const csv = (arr) => arr.join(',')

  const trim = (str) => str.replace(/^\s*|\s*$/g, '')
  const normalize = (str) => str.replace(/\-/g, '')
  const cleanInput = R.compose(normalize, trim)

  const append = function (elementId) {
    return function (info) {
      document.querySelector(elementId).innerHTML = info
      return info
    }
  }

  const showStudent = (ssn) => {
    Maybe.fromNullable(ssn)
      .map(cleanInput)
      .chain(checkLengthSsn)
      .chain(findStudent)
      .map(R.props(['ssn', 'firstname', 'lastname']))
      .map(csv)
      .map(append('#student-info'))
  }

  showStudent('444-44-4444')
}
