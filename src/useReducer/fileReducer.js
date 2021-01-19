export default (state, action) => {
  switch (action.type) {
    case 'UPDATE_FILES':
      return [...action.filez];
    case 'REMOVE_FILE':
      return removeFileFunc(state, action);
    case 'UPDATE_PROGRESS_VALUE':
      return updateProgressValue(state, action);
    case 'ADD_RESPONSE_URL':
      return addResponseUrl(state, action);
    default:
      return state;
  }
};

const removeFileFunc = (state, action) => {
  const newState = state.slice(0);
  return newState.filter((file) => file.id !== action.fileID);
};

const updateProgressValue = (state, action) => {
  const newState = state.slice(0);
  const fileIndex = newState.findIndex((file) => file.id === action.fileID);
  newState[fileIndex].progress = action.progress;
  newState[fileIndex].cancelFunc = action.cancelFunc;
  newState[fileIndex].loading = true;
  newState[fileIndex].success = false;
  return newState;
};

const addResponseUrl = (state, action) => {
  const newState = state.slice(0);
  const fileIndex = newState.findIndex((file) => file.id === action.fileID);
  newState[fileIndex].responseUrl = action.responseUrl;
  newState[fileIndex].loading = false;
  newState[fileIndex].success = true;
  return newState;
};
