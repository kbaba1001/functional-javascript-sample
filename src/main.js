import React from 'react'
import ReactDOM from 'react-dom'
import classes from './game.css'
import S from 'sanctuary'
// import $ from 'sanctuary-def'

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {S.maybeToNullable(this.props.value)}
      </button>
    );
  }
}

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  const find_line = (line) => {
    const target = S.justs (line.map(x => squares[x]))
    if (target.length !== 3) { return false }

    return !!(target[0] && target[0] === target[1] && target[0] === target[2])
  }

  return S.chain (line => squares[line[0]]) (S.find (find_line) (lines))
}

const getDisplayMark = (xIsNext) => S.Just(xIsNext ? 'X' : 'O')
const setCheck = (n, mark, squares) => {
  const new_squares = [...squares]
  new_squares[n] = mark
  return new_squares
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(S.Nothing),
      xIsNext: true,
    }
  }

  handleClick(i) {
    if (S.isJust (calculateWinner(this.state.squares) || this.state.squares[i])) { return }

    this.setState(
      S.pipe([
        S.prop ('squares'),
        S.curry3 (setCheck) (i) (getDisplayMark(this.state.xIsNext)),
        squares => ({squares: squares})
      ]) (this.state)
    )
    this.setState(
      S.pipe([
        S.prop ('xIsNext'),
        xIsNext => ({xIsNext: !xIsNext})
      ]) (this.state)
    )
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    )
  }

  render() {
    const status = S.pipe([
      S.maybeToNullable,
      winner => winner ? ('Winner: ' + winner) : ('Next player: ' + S.maybeToNullable(getDisplayMark(this.state.xIsNext)))
    ]) (calculateWinner(this.state.squares))

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

export default function main() {
  ReactDOM.render(<Game />, document.querySelector("#root"));






  // S.compose は2つの関数を合成するだけ
  // console.log(S.compose (Math.sqrt) (S.add (1)) (99))

  // const hoge = S.pipe([
  //   S.add (1),
  //   Math.sqrt,
  //   S.sub (1)]
  // )
  // console.log(hoge(99))
}

// export default function main() {
//   // data
//   const db = {
//     students: {
//       '444-44-4444': {
//         ssn: '444-44-4444',
//         firstname: 'Alonzo',
//         lastname: 'Church'
//       },
//       '444444444': {
//         ssn: '444-44-4444',
//         firstname: 'Alonzo',
//         lastname: 'Church'
//       },
//     },
//     find: function (ssn) {
//       return this.students[ssn]
//     }
//   }


//   const validLength = (len, str) => {
//     return str.length === len
//   }

//   const checkLengthSsn = ssn => {
//     return Either.of(ssn)
//       .filter(R.partial(validLength, [9]));
//   }
//   // const checkLengthSsn = (ssn) => {
//   //   return validLength(9, ssn) ? Either.right(ssn) : Either.left('Invalid SSN')
//   // }

//   const find = R.curry((db, id) => db.find(id))

//   const safeFindObject = R.curry((db, id) => Either.fromNullable(find(db, id)));
//   // const safeFindObject = R.curry((db, id) => {
//   //   const val = find(db, id)
//   //   return val ? Either.right(val) : Either.left(`Object not foundwith ID: ${id}`)
//   // })

//   const findStudent = safeFindObject(db)

//   const csv = (arr) => arr.join(',')

//   const trim = (str) => str.replace(/^\s*|\s*$/g, '')
//   const normalize = (str) => str.replace(/\-/g, '')
//   const cleanInput = R.compose(normalize, trim)

//   const append = function (elementId) {
//     return function (info) {
//       document.querySelector(elementId).innerHTML = info
//       return info
//     }
//   }

//   const map = R.curry((f, container) => container.map(f))
//   const chain = R.curry((f, container) => container.chain(f))
//   const lift = R.curry((f, obj) => Maybe.fromNullable(f(obj)))
//   const liftIO = (val) => IO.of(val)
//   const getOrElse = R.curry((message, container) => container.getOrElse(message))

//   const trace = R.curry((msg, obj) => console.log(msg, obj))

//   const showStudent = R.compose(
//     map(append('#student-info')),
//     liftIO,
//     getOrElse('unable to find student'),
//     map(csv),
//     map(R.props(['ssn', 'firstname', 'lastname'])),
//     chain(findStudent),
//     chain(checkLengthSsn),
//     lift(cleanInput)
//   )

//   showStudent('444-44-4444').run()
// }
