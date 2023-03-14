import React, {useState, useReducer} from 'react';
import {createRoot} from 'react-dom/client';
import {PanelState} from 'react-dockable-ts';

import {WindowProxy} from './layout/components/WindowProxy';
import {MenuBar} from './layout/components/MenuBar';
import {ToolBar} from './layout/components/ToolBar';
import {PropertyBar} from './layout/components/PropertyBar';
import {StatusBar} from './layout/components/StatusBar';
import {WorkspaceArea} from './layout/components/WorkspaceArea';

import {getMenu} from './breaditor/menu';
import {
  activeDocument,
  addDocument,
  getWidgetInfo,
  getDocumentInfo,
  createInitialDocumentInfoForLoadedDocuments,
  createInitialPanelInfoForDocumentType,
} from './breaditor/DocumentManager';

import {mapMaker} from './breaditor/documents/MapDocument';
import {textMaker} from './breaditor/documents/TextDocument';
import {spriteMaker} from './breaditor/documents/SpriteDocument';
// import {TOOLS} from './breaditor/tools/constants';

import {
  breaditorReducer,
  getInitialState,
} from './state-management/in-memory/main_reducer';

import {DocumentInfo, WidgetInfo} from '../../types/global';

// @ts-ignore
import css from './ReactDockableApp.module.css';

let docLoaded = false;

function createInitialPanelState(): PanelState[] {
  if (!docLoaded) return [];

  const ad = activeDocument();
  if (!ad) return [];
  return createPanelStateForWidgetInfoList(
    createInitialPanelInfoForDocumentType(ad.info.type),
  );
}

function createInitialDocumentState(): PanelState[] {
  if (!docLoaded) return [];

  return createPanelStateForDocumentInfoList(
    createInitialDocumentInfoForLoadedDocuments(),
  );
}

function createPanelStateForDocumentInfoList(info: WidgetInfo[]): PanelState[] {
  let selected = 0;
  const active = activeDocument();
  const widgets: string[] = [];
  for (let index = 0; index < info.length; index++) {
    const curId = info[index].id;

    if (active != null && active.info.id == curId) {
      selected = index;
    }

    widgets.push(info[index].id);
  }

  return [
    {
      windows: [
        {
          selected: selected,
          widgets: widgets,
        },
      ],
    },
  ];
}

function createPanelStateForWidgetInfoList(info: WidgetInfo[]): PanelState[] {
  const bin1: string[] = [];
  const bin2: string[] = [];
  const bin3: string[] = [];

  for (let index = 0; index < info.length; index++) {
    const curId = info[index].id;

    if (index < 2) {
      bin1.push(curId);
    } else if (index < 4) {
      bin2.push(curId);
    } else {
      bin3.push(curId);
    }
  }

  let ret = [{windows: []}];

  const windows: any[] = [];

  if (bin1.length > 0) {
    windows.push({
      selected: 0,
      widgets: bin1,
    });
  }

  if (bin2.length > 0) {
    windows.push({
      selected: 0,
      widgets: bin2,
    });
  }

  if (bin3.length > 0) {
    windows.push({
      selected: 0,
      widgets: bin3,
    });
  }

  // @ts-ignore
  ret[0].windows = windows;

  return ret as PanelState[];
}

function getCurrentPanels(): WidgetInfo[] {
  if (!docLoaded) return [];
  return getWidgetInfo();
}

function getCurrentDocuments(): DocumentInfo[] {
  if (!docLoaded) return [];
  return getDocumentInfo();
}

type FakeStateFn = (a: any) => void;
function _TEST_setStateHandlers(
  __setPanelState: FakeStateFn,
  __setDocPanelState: FakeStateFn,
) {
  _setPanelState = __setPanelState;
  _setDocPanelState = __setDocPanelState;
}

let _setPanelState: any;
let _setDocPanelState: any;

let _PanelState: any;
let _DocumentState: any;

let _CachedValidPanelState: any = null;
let _CachedValidDocumentState: any = null;

function setOnOrOff(onOrOff: boolean) {
  let newPanelState: any;
  let newDocState: any;

  docLoaded = onOrOff;

  if (onOrOff) {
    if (_CachedValidPanelState == null) {
      _CachedValidPanelState = createInitialPanelState();
      _CachedValidDocumentState = createInitialDocumentState();
    }
    newPanelState = _CachedValidPanelState;
    newDocState = _CachedValidDocumentState;
  } else {
    _CachedValidPanelState = _PanelState;
    _CachedValidDocumentState = _DocumentState;
    newPanelState = [];
    newDocState = [];
  }

  console.log(newPanelState);

  updateDocumentManagerState(newDocState, newPanelState);
}

function updateDocumentManagerState(
  documentState: PanelState[],
  panelState: PanelState[],
) {
  if (!_setPanelState) {
    debugger;
  }
  _setPanelState(panelState);
  _setDocPanelState(documentState);
}

function getDocumentState() {
  return _DocumentState;
}

function App() {
  const [state, dispatch] = useReducer(breaditorReducer, getInitialState());

  if (dispatch == undefined) {
    console.info(state);
  }

  const [panelState, setPanelState] = useState<PanelState[]>(
    createInitialPanelState(),
  );

  const [documentState, setDocumentState] = useState<PanelState[]>(
    createInitialDocumentState(),
  );

  _setPanelState = setPanelState;
  _setDocPanelState = setDocumentState;

  _PanelState = panelState;
  _DocumentState = documentState;

  return (
    <WindowProxy
      events={
        {
          // keydown: this.handleKeyDown,
          // keyup: this.handleKeyUp,
        }
      }
    >
      <div
        className={css.App}
        style={{
          display: 'flex',
          flexDirection: 'column',
          // Dark Theme
        }}
        data-testid="breaditor-browser-app"
      >
        <MenuBar
          dispatch={dispatch}
          widgets={getCurrentPanels()}
          hidden={
            {
              /*this.getState().widgets.hidden*/
            }
          }
          getMenu={getMenu}
        />
        <PropertyBar
          state={{tool: {activeTool: 0}}}
          dispatch={dispatch}
          view={{}}
        />
        <div
          style={{
            flexGrow: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'row',
            height: 'calc(100vh - 117px)',
          }}
        >
          <ToolBar selected={{}} dispatch={dispatch} />
          <WorkspaceArea
            key={'main_workspace'}
            style={{
              flexGrow: 1,
              // maxWidth: `calc(100% - 47px)`,

              // margin: "1px 0 0 1px",
              // boxSizing: "border-box",
              padding: 1,
            }}
            initialPanelState={panelState}
            setPanelState={setPanelState}
            initialDocumentsState={documentState}
            setDocumentState={setDocumentState}
            documents={getCurrentDocuments()}
            panels={getCurrentPanels()}
            themeClass={'nullTheme'}
          />
        </div>
        <StatusBar
          initialStatuses={['Welcome to the Breaditor', '❤', '🦵']}
          dispatch={dispatch}
        />
      </div>
    </WindowProxy>
  );
}

function init() {
  const domNode = document.getElementById('react-root') as Element;

  const root = createRoot(domNode);

  addDocument(mapMaker('Map A'));
  addDocument(textMaker('Text B'));
  addDocument(spriteMaker('Sprite C'));
  addDocument(mapMaker('Map D'));

  root.render(<App />);
}

export {
  App,
  createPanelStateForDocumentInfoList,
  createPanelStateForWidgetInfoList,
  getCurrentPanels,
  init,
  setOnOrOff,
  updateDocumentManagerState,
  createInitialPanelInfoForDocumentType,
  getDocumentState,
  _TEST_setStateHandlers,
};
