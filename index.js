// The possible methods.
const METHOD_OPERATORS = {
  add: '+',
  subtract: '-',
  multiply: '*',
  divide: '/'
}

// State Object with shape `{operator: <string>, suffix: <number>}`
// representing method that has been learnt.
let learntMethod

/**
 * Prompts first for a number representing input, then for a number representing
 * output.
 *
 * @returns {Object} Object with shape `{input: <number>, output: <number>}`.
 */
async function promptGuess () {

}

/**
 * Attempts to derive the mathematical method used to derive one number from
 * another. If unsuccessful, or if not enout information available, prompts for
 * another pair.
 *
 * @param {Object} object - Parameter object.
 * @param {number} object.input - Input for the training.
 * @param {number} object.output - Output for the training.
 *
 * @returns {Object} Object with shape `{operator: <string>, suffix: <number>}`
 * confirming learnt mathematical method.
 */
export function guess ({ input, output }) {
  // Represents guesses that have been made.
  let guesses
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

}

/**
 * Prompts for a number representing input.
 *
 * @returns {number} Number representing input.
 */
async function promptOperate () {

}

/**
 * Operate on input using the learnt mathematical method.
 *
 * @param {Object} object - Parameter object.
 * @param {number} object.input - Input for the operation.
 * @param {string} object.operator - String representing operation.
 * @param {number} object.suffix - The suffix for the method.
 *
 * @returns {number} Output of operation.
 */
export function operate ({input, operator, suffix}) {

}
