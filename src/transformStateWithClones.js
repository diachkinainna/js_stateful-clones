'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const stateClone = { ...state };

  for (const object of actions) {
    switch (object.type) {
      case 'addProperties':
        const { extraData } = object;

        Object.assign(stateClone, extraData);
        break;

      case 'removeProperties':
        const { keysToRemove } = object;

        for (const key of keysToRemove) {
          delete stateClone[key];
        }
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;

      default:
        break;
    }
    stateHistory.push({ ...stateClone });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
