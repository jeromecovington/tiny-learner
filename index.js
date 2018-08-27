const promptly = require('promptly')

// Arithmetic operators to learn.
const OPERATORS = {
  add: '+',
  subtract: '-',
  multiply: '*',
  divide: '/'
}

// State Array with members of shape `{operator: <string>, suffix: <number>}`
// representing parameters learned.
let parameters = []

// State representing function learned.
let learntFunction

/**
 * Prompts first for a number representing input, then for a number representing
 * output.
 *
 * @returns {Object} Object with shape `{input: <number>, output: <number>}`.
 */
async function promptLearn () {
  const fragment = !parameters.length ? 'start' : 'keep'
  const input = await promptly.prompt(`Let's ${fragment} learning. What is the input?`)
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
 * @returns {boolean} Indicates whether operator & method have been learned.
 */
function learn ({ input, output }) {
  let success = false

  if (input === output) {
    parameters.push({ operator: OPERATORS.add, suffix: 0 })

    success = true
  }

  if (!parameters.length) {
    if (input < output) {
      parameters.push({ operator: OPERATORS.add, suffix: output - input })
      parameters.push({ operator: OPERATORS.multiply, suffix: output / input })
    }
    if (input > output) {
      parameters.push({ operator: OPERATORS.subtract, suffix: input - output })
      parameters.push({ operator: OPERATORS.divide, suffix: input / output })
    }
  } else {
    parameters = parameters.filter(guess => {
      /* eslint-disable-next-line no-eval */
      return eval(`${input} ${guess.operator} ${guess.suffix} === ${output}`)
    })

    if (parameters.length) {
      success = true
    } else {
      console.log('Hmmm, something didn\'t make sense. Can we try again?')
    }
  }

  return success
}

/**
 * Asserts learnt function.
 *
 * @param {Object} object - Parameter object.
 * @param {string} object.operator - String representing operation.
 * @param {number} object.suffix - The suffix for the method.
 *
 * @returns {string} Object with shape `{operator: <string>, suffix: <number>}`
 * confirming learnt mathematical method.
 */
function assertFunction ({ operator, suffix }) {
  /* eslint-disable-next-line no-new-func */
  learntFunction = new Function(
    'input',
    `
    const result = input ${operator} ${suffix};
    console.log(input + ' ${operator} ' + ${suffix} + ' = ' + result);
    return result;
    `
  )

  console.log('Function learned:')
  console.log(learntFunction.toString())
}

/**
 * Prompts for a number representing input.
 *
 * @returns {number} Number representing input.
 */
async function promptOperate () {
  const input = await promptly.prompt('Let\'s exercise the learned function.\nWhat is the input?')

  return parseInt(input, 10)
}

/**
 * Initialize the learner.
 *
 * @returns {undefined} Undefined.
 */
async function init () {
  let hasLearned = false

  while (!hasLearned) {
    const inOut = await promptLearn()
    hasLearned = learn(inOut)
  }

  assertFunction(parameters[parameters.length - 1])
  const input = await promptOperate()
  learntFunction(input)
}

init()
