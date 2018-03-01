import { NEWESTINFO } from '../constants/actionTypes';

export function newestInfoFetchSuccess() {
  return {
    type: NEWESTINFO.SUCCESS,
  };
}

export function newestInfoFetchFailure(rankingMode) {
  return {
    type: NEWESTINFO.FAILURE,
    payload: {
      rankingMode,
    },
  };
}

export function newestInfoFetch(
  // rankingMode,
  // options,
  // nextUrl,
  // refreshing = false,
) {
  // const offset = params.offset;
  return {
    type: NEWESTINFO.REQUEST,
    payload: {
      // rankingMode,
      // options,
      // offset,
      // nextUrl,
      // refreshing,
    },
  };
}

// export function clearRanking(rankingMode) {
//   return {
//     type: RANKING.CLEAR,
//     payload: {
//       rankingMode,
//     },
//   };
// }

// export function clearAllRanking(rankingMode) {
//   return {
//     type: RANKING.CLEAR_ALL,
//     payload: {
//       rankingMode,
//     },
//   };
// }
