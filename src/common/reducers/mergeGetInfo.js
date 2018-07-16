import { MERGE_GETINFO } from '../constants/actionTypes';
import { PULLUPLOAD } from '../constants/stateConstants';

const initState = {
  loading: false,
  loaded: false,
  pulluploading: PULLUPLOAD.SUCCESS,
  items: [],
  currentpage: 1
};

export default function mergeGetInfo(state = initState, action) {

  switch (action.type) {
    case MERGE_GETINFO.CLEAR:
      return {
        ...initState
      };
    case MERGE_GETINFO.REQUEST:
      var {
        currentpage
      } = action.payload;
      return {
        ...state,
        loading: currentpage === 1? true: state.loading,
        currentpage: currentpage,
        pulluploading: currentpage === 1? state.pulluploading: PULLUPLOAD.ING,
      };
    case MERGE_GETINFO.SUCCESS:
      var {
        items,
        currentpage
      } = action.payload;
      var pulluploading;
      currentpage !== 1 && items.length === 0 && (pulluploading=PULLUPLOAD.NOMORE) 
      return {
        ...state,
        loading: currentpage === 1? false: state.loading,
        loaded: true,
        // items: items
        items: currentpage === 1? items: [...state.items, ...items],
        pulluploading: pulluploading || (currentpage === 1? state.pulluploading: PULLUPLOAD.SUCCESS),
      };
    case MERGE_GETINFO.FAILURE:
      var {
        currentpage
      } = action.payload;
      return {
        ...state,
        loading: currentpage === 1? false: state.loading,
        loaded: true,
        currentpage: currentpage === 1? currentpage: currentpage - 1,
        pulluploading: currentpage === 1? state.pulluploading: PULLUPLOAD.FAILURE,
      };
    default:
      return state;
  }
}
