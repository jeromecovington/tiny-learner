// The possible methods.
const METHOD_OPERATORS = [
  '+',
  '-',
  '*',
  '/'
];

// State Object with shape `{operator: <string>, suffix: <number>}`
// representing method that has been learnt.
let learntMethod;

/**
 * Prompts first for a number representing input, then for a number representing
 * output.
 *
 * @returns {Object} Object with shape `{in: <number>, out: <number>}`
 */
async function promptGuess() {

}

/**
 * Attempts to derive the mathematical method used to derive one number from
 * another. If unsuccessful, or if not enout information available, prompts for
 * another pair.
 *
 * @param {Number} object.in - Input for the training
 * @param {Number} object.out - Output for the training
 *
 * @returns {Object} Object with shape `{operator: <string>, suffix: <number>}`
 * confirming learnt mathematical method
 */
export function guess({in, out}) {
  // Represents guesses that have been made.
  let guesses;

}

/**
 * Affirms learnt method.
 *
 * @param {string} object.operator - String representing operation
 * @param {Number} object.suffix - The suffix for the method
 *
 * @returns {Object} Object with shape `{operator: <string>, suffix: <number>}`
 * confirming learnt mathematical method
 */
function learn({operator, suffix}) {

}

/**
 * Propmpts for a number representing input.
 *
 * @returns {Number} Number representing input
 */
async function promptOperate() {

}

/**
 * Operate on input using the learnt mathematical method.
 *
 * @param {Number} object.in - Input for the operation
 * @param {string} object.operator - String representing operation
 * @param {Number} object.suffix - The suffix for the method
 *
 * @returns {Number} Output of operation
 */
export function operate({in, operator, suffix}) {

}
