import {toolsReducer} from './reducers/tools.reducer';

//import documentsReducer from './reducers/documents.reducer.js';
//import workspaceReducer from './reducers/workspace.reducer.js';

//import widgetsReducer from './reducers/widgets.reducer.js';

type StringToAnyMap = {[key: string]: any};
type GenericState = StringToAnyMap;
/*
type GenericAction = {
  [key: string]: any;
  action: string;
};
*/

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
  return function (
    state = initialState,
    action: GenericAction,
  ): GenericReducerMap {
    if (action && handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

const breaditorReducer = createReducer(
  {},
  {
    foo: createReducer(
      {},
      {
        FOO_ACTION: (state: any, action: any) => {
          return {...state, a: state.a + action.foo};
        },
      },
    ),
    //tools: toolsReducer,
  },
);

function taco() {
  console.info(toolsReducer);
}

const getInitialState = function () {
  return breaditorReducer({}, {action: 'INITIALIZE_STATE'});
};

export type {
  StringToAnyMap,
  GenericState,
  GenericAction,
  GenericReducerMap,
  Reducer,
  GenericReducer,
};
export {breaditorReducer, getInitialState, createReducer, taco};
