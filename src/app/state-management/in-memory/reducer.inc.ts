type StringToAnyMap = {[key: string]: any};
type GenericState = StringToAnyMap;

// type GenericAction = {
//   [key: string]: any;
//   type: string;
// };

type GenericAction = any;

type GenericReducerMap = {
  [key: string]: (state: GenericState, action: GenericAction) => GenericState;
};

type Reducer<S, A> = (state: S, action: A) => S;
type GenericReducer = Reducer<any, any>; //TODO: GenericReducer will die shortly.  But for now...

function createReducer(
  initialState: GenericState,
  handlers: GenericReducerMap,
): GenericReducer {
  const myHandlers = handlers;

  return function (
    state = initialState,
    action: GenericAction,
  ): GenericReducerMap {
    if (action && myHandlers.hasOwnProperty(action.type)) {
      return myHandlers[action.type](state, action);
    } else {
      // console.error(`Unhandled action: ${action.type} `);
    }
    return state;
  };
}

export type {
  StringToAnyMap,
  GenericState,
  GenericAction,
  GenericReducerMap,
  Reducer,
  GenericReducer,
};
export {createReducer};
