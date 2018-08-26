const promptly = require('promptly')

// The possible methods.
const OPERATORS = {
  add: '+',
  subtract: '-',
  multiply: '*',
  divide: '/'
}

// State Array with members of shape `{operator: <string>, suffix: <number>}`
// representing methods guessed.
let guesses = []

// State Object with shape `{operator: <string>, suffix: <number>}`
// representing method that has been learnt.
const learntMethod = {}

// State representing function learned.
let learntFunction

/**
 * Prompts first for a number representing input, then for a number representing
 * output.
 *
 * @returns {Object} Object with shape `{input: <number>, output: <number>}`.
 */
async function promptGuess () {
  const input = await promptly.prompt('Let\'s keep learning. What is the input?')
  const output = await promptly.prompt('What is the output?')

  return {
    input: parseInt(input, 10),
    output: parseInt(output, 10)
  }
}

/**
 * Attempts to derive the mathematical method used to derive one number from
 * another. If unsuccessful, or if not enough information available, prompts for
 * another pair.
 *
 * @param {Object} object - Parameter object.
 * @param {number} object.input - Input for the training.
 * @param {number} object.output - Output for the training.
 *
 * @returns {boolean} Indicates whether operator & method have been guessed.
 */
function makeGuess ({ input, output }) {
  let success = false

  if (input < output) {
    if (!guesses.length) {
      guesses.push({ operator: OPERATORS.add, suffix: output - input })
      guesses.push({ operator: OPERATORS.multiply, suffix: output / input })
    } else {
      guesses = guesses.filter(guess => {
        /* eslint-disable-next-line no-eval */
        return eval(`${input} ${guess.operator} ${guess.suffix} === ${output}`)
      })

      success = true
    }
  }

  if (input > output) {
    if (!guesses.length) {
      guesses.push({ operator: OPERATORS.subtract, suffix: input - output })
      guesses.push({ operator: OPERATORS.divide, suffix: input / output })
    } else {
      guesses.filter(guess => {
        /* eslint-disable-next-line no-eval */
        return eval(`${input} ${guess.operator} ${guess.suffix} === ${output}`)
      })

      success = true
    }
  }

  if (input === output) {
    guesses.push({ operator: OPERATORS.add, suffix: 0 })

    success = true
  }

  return success
}

/**
 * Affirms learnt method.
 *
 * @param {Object} object - Parameter object.
 * @param {string} object.operator - String representing operation.
 * @param {number} object.suffix - The suffix for the method.
 *
 * @returns {Object} Object with shape `{operator: <string>, suffix: <number>}`
 * confirming learnt mathematical method.
 */
function learn ({ operator, suffix }) {
  learntMethod.operator = operator
  learntMethod.suffix = suffix

  return {
    operator,
    suffix
  }
}

/**
 * Affirms learnt function.
 *
 * @param {Object} object - Parameter object.
 * @param {string} object.operator - String representing operation.
 * @param {number} object.suffix - The suffix for the method.
 *
 * @returns {string} Object with shape `{operator: <string>, suffix: <number>}`
 * confirming learnt mathematical method.
 */
function learnFunction ({ operator, suffix }) {
  /* eslint-disable-next-line no-new-func */
  learntFunction = new Function('input', `return input ${operator} ${suffix}`)
}

/**
 * Prompts for a number representing input.
 *
 * @returns {number} Number representing input.
 */
async function promptOperate () {
  const input = await promptly.prompt('Function learned. Let\'s exercise the learned function.\nWhat is the input?')

  return parseInt(input, 10)
}

/**
 * Operate on input using the learnt mathematical method.
 *
 * @param {number} input - Input for the operation.
 * @param {Object} object - Parameter object.
 * @param {string} object.operator - String representing operation.
 * @param {number} object.suffix - The suffix for the method.
 *
 * @returns {number} Output of operation.
 */
function operate (input, {operator, suffix}) {
  /* eslint-disable-next-line no-eval */
  const result = eval(`${input} ${operator} ${suffix}`)

  console.log(`${input} ${operator} ${suffix} = ${result}`)

  return result
}

/**
 * Initialize the learner.
 *
 * @returns {undefined} Undefined.
 */
async function init () {
  let hasGuessed = false

  while (!hasGuessed) {
    const inOut = await promptGuess()
    hasGuessed = makeGuess(inOut)
  }

  learn(guesses[guesses.length - 1])
  const input = await promptOperate()
  operate(input, learntMethod)

  learnFunction(guesses[guesses.length - 1])
  console.log(learntFunction.toString())
  console.log(learntFunction(input))
}

init()
