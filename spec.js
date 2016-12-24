const includes = require('./')
const postcss = require('postcss')
const test = require('tape')

const expected = `
    .colors {
      background-color: white;
      color: black;
    }

    .padding {
      padding: 1rem 0;
    }

    main {
      background-color: white;
      color: black;
      padding: 1rem 0;
    }`

test('parse basic includes', t => {
  const input = `
    .colors {
      background-color: white;
      color: black;
    }

    .padding {
      padding: 1rem 0;
    }

    main {
      @include .colors;
      @include .padding;
    }`

  run(t, input, expected)
})

test('parse comma-separated includes list', t => {
  const input = `
    .colors {
      background-color: white;
      color: black;
    }

    .padding {
      padding: 1rem 0;
    }

    main {
      @include .colors, .padding;
    }`

  run(t, input, expected)
})

/**
 * Run postcss and evaluate output
 */
function run (t, input, expected) {
  postcss([includes()]).
    process(input).
    then(result => {
      t.equal(result.css, expected, 'Correct CSS output generated')
      t.equal(result.warnings().length, 0, 'No PostCSS warnings thrown')
      t.end()
    })
}
