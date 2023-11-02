export const setDataInRedux = (ids) => {
  return {
    type: "SET_SELECTED_IDS",
    payload: ids,
  };
}