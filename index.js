// Ramda より Sanctuary の方が包括的であるようだ。
// Ramda になれたら Sanctuary に以降しよう
// https://github.com/sanctuary-js/sanctuary
//
// 当面の計画としては、まずは『JavaScript関数型プログラミング』に従う。
// EitherやIOモナドは本書のコードから拝借する
//
// これになれたら Sanctuary に移る

const R = require('ramda')

console.log(R.prop('x', {x: 100}))
