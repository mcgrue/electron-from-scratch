/*
import {createReducer, GenericAction, Reducer} from '../reducer';

import {TOOLS} from '../../../breaditor/tools/constants'; //TODO: This should be in *THIS* file, right?
// TODO: and should have a concrete union type I think?

interface ToolState {
  activeTool: number; // Tool index, really
  tool: any; // how to type this?
  a: number;
  b: number;
}

const initialToolState: ToolState = {
  activeTool: TOOLS.Brush,
  tool: {},
  a: 0,
  b: 0,
};

interface ToolActionIncA extends GenericAction {
  foo: number;
  action: 'INC_A';
}

interface ToolActionIncB extends GenericAction {
  bar: number;
  action: 'INC_B';
}

type ToolAction = ToolActionIncA | ToolActionIncB;

const toolsReducer: Reducer<ToolState, ToolAction> = createReducer(
  initialToolState,
  {
    INC_A: (state, action: ToolActionIncA) => {
      return {...state, a: state.a + action.foo};
    },
    INC_B: (state, action: ToolActionIncB) => {
      return {...state, b: state.b + action.bar};
    },
  },
);
*/

const toolsReducer = {};

export {toolsReducer};
