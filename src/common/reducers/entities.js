export default function entities(
  state = {
    product_detail: {},
    properties_detail: {},
    getAllProductInfo: {},
    // users: {},
    // userPreviews: {},
    // userProfiles: {},
  },
  action,
) {
  if (action && action.payload && action.payload.entities) {
    const newState = { ...state };
    Object.keys(action.payload.entities).forEach(type => {
      const entity = action.payload.entities[type];
      newState[type] = {
        ...newState[type],
        ...entity,
      };
    });
    return newState;
  }
  switch (action.type) {
    default:
      return state;
  }
}
