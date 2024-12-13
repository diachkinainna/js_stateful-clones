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
    if (object.type === 'addProperties') {
      const { extraData } = object;

      Object.assign(clone, extraData);

      stateHistory.push({ ...clone });
    }

    if (object.type === 'removeProperties') {
      const { keysToRemove } = object;

      for (const key of keysToRemove) {
        delete clone[key];
      }

      stateHistory.push({ ...clone });
    }

    if (object.type === 'clear') {
      for (const key in clone) {
        delete clone[key];
      }

      stateHistory.push({});
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
