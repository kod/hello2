export default function entities(
  state = {
    illusts: {},
    illustComments: {},
    users: {},
    userPreviews: {},
    userProfiles: {},
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
}