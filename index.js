// The possible methods.
const METHODS = [
  '+',
  '-',
  '*',
  '/'
];

// State representing guesses that have been made.
let guesses;

// State representing method that has been leart.
let learntMethod;

/**
 * Prompts first for a number representing input, then for a number representing output.
 *
 * @returns {Object} Object with shape `{in: <number>, out: <number>}`
 */
async function prompt() {

}

/**
 * Attempts to derive the mathematical method used to derive one number from another.
 * If unsuccessful, or if not enout information available, prompts for another pair.
 *
 * @returns {string} String confirming learnt mathematical method
 */
function guess({in, out}) {

}

/**
 * Affirms learnt method.
 *
 * @returns {string} String rpresenting learnt method.
 */
function learn(method) {

}

/**
 * Operate on input using the learnt mathematical method.
 *
 * @returns {Number} Output of operation
 */
async function operate(in) {

}
