import {fromJS} from 'immutable';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('letrusState');
    if (serializedState === null) {
      return undefined;
    }
    return fromJS(JSON.parse(serializedState));
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: any) => {
  /**
   * Add to this array the list os store slices to be
   * stored in localStorage
   */
  const selectedSlices = ['authentication', 'router'];

  try {
    const selectedState = state.filter((v: any, k: any) =>
      selectedSlices.includes(k),
    );
    const serializedState = JSON.stringify(selectedState.toJS());
    localStorage.setItem('letrusState', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};
