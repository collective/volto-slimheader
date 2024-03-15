/**
 * SlimHeader actions.
 * @module actions/getSlimHeader
 */
export const GET_SLIMHEADER = 'GET_SLIMHEADER';

/**
 * Get SlimHeader.
 * @function getSlimHeader
 * @returns {Object} Get SlimHeader action.
 * Es: http://localhost:8080/Plone/@slimheader
 */
export function getSlimHeader() {
  return {
    type: GET_SLIMHEADER,
    request: {
      op: 'get',
      path: '/@slimheader',
    },
  };
}
