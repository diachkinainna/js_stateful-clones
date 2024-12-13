'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const clone = { ...state };

  for (const object of actions) {
    switch (object.type) {
      case 'addProperties':
        const { extraData } = object;

        Object.assign(clone, extraData);
        break;

      case 'removeProperties':
        const { keysToRemove } = object;

        for (const key of keysToRemove) {
          delete clone[key];
        }
        break;

      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
    }
    stateHistory.push({ ...clone });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
