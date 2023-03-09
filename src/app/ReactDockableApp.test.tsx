import React, {useState /*, useReducer*/} from 'react';
import {createRoot} from 'react-dom/client';
import {PanelState} from 'react-dockable-ts';

import {WindowProxy} from './layout/components/WindowProxy';
import {MenuBar} from './layout/components/MenuBar';
import {ToolBar} from './layout/components/ToolBar';
import {PropertyBar} from './layout/components/PropertyBar';
import {StatusBar} from './layout/components/StatusBar';
import {WorkspaceArea} from './layout/components/WorkspaceArea';

import {getMenu} from './breaditor/menu';
import {addDocument} from './breaditor/DocumentManager';
import {mapMaker} from './breaditor/documents/MapDocument';
import {textMaker} from './breaditor/documents/TextDocument';
import {spriteMaker} from './breaditor/documents/SpriteDocument';
import {TOOLS} from './breaditor/tools/constants';
import {DocumentInfo, WidgetInfo} from '../../types/global';

// @ts-ignore
import css from './ReactDockableApp.module.css';

let docLoaded = false;

addDocument(mapMaker('Map A'));
addDocument(textMaker('Text B'));
addDocument(spriteMaker('Sprite C'));
addDocument(mapMaker('Map D'));

const demoInitialPanelState: PanelState[] = [
  {
    windows: [
      {
        selected: 0,
        widgets: ['PanelA', 'PanelB'],
      },
      {
        selected: 0,
        widgets: ['PanelC', 'PanelD', 'PanelE'],
      },
      {
        selected: 0,
        widgets: ['PanelF'],
      },
    ],
  },
];

const demoPanelInfo: WidgetInfo[] = [
  {id: 'PanelA', title: 'Panel A'},
  {id: 'PanelB', title: 'Panel B'},
  {id: 'PanelC', title: 'Panel C'},
  {id: 'PanelD', title: 'Panel D'},
  {id: 'PanelE', title: 'Panel E'},
  {id: 'PanelF', title: 'Panel F'},
];

const demoInitialDocState: PanelState[] = [
  {
    windows: [
      {
        selected: 0,
        widgets: ['DocA', 'DocB'],
      },
    ],
  },
];

const demoDocumentsInfo: DocumentInfo[] = [
  {id: 'DocA', title: 'Doc A', type: 'MAP'},
  {id: 'DocB', title: 'Doc B', type: 'MAP'},
];

function getCurrentPanels(): WidgetInfo[] {
  if (!docLoaded) return [];
  return demoPanelInfo;
}

function getCurrentDocuments(): DocumentInfo[] {
  if (!docLoaded) return [];
  return demoDocumentsInfo;
}

let _setPanelState: any;
let _setDocPanelState: any;
export function setOnOrOff(onOrOff: boolean) {
  docLoaded = onOrOff;
  updateDocumentManagerState(
    docLoaded ? demoInitialDocState : [],
    docLoaded ? demoInitialPanelState : [],
  );
}

export function updateDocumentManagerState(
  panelState: PanelState[],
  documentState: PanelState[],
) {
  _setPanelState(docLoaded ? demoInitialPanelState : []);
  _setDocPanelState(docLoaded ? demoInitialDocState : []);
}

export function App() {
  const [panelState, setPanelState] = useState<PanelState[]>(
    docLoaded ? demoInitialPanelState : [],
  );

  const [docPanelState, setDocPanelState] = useState<PanelState[]>(
    docLoaded ? demoInitialDocState : [],
  );

  _setPanelState = setPanelState;
  _setDocPanelState = setDocPanelState;

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
      >
        <MenuBar
          dispatch={(foo: any) => {
            console.log('I am a fake dispatch in ReactDockableApp.  Yay.', foo);
          }}
          widgets={getCurrentPanels()}
          hidden={
            {
              /*this.getState().widgets.hidden*/
            }
          }
          getMenu={getMenu}
        />
        <PropertyBar
          state={{}}
          dispatch={(bar) => {
            console.log('Another fake dispatch that was passed: ', bar);
          }}
          tool={TOOLS.Brush}
          view={{}}
        />
        <div
          style={{
            flexGrow: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'row',
            height: 'calc(100vh - 128px)',
          }}
        >
          <ToolBar
            selected={{}}
            dispatch={(foo) => {
              console.log('A fake dispatch that was passed: ', foo);
            }}
          />
          <WorkspaceArea
            key={'main_workspace'}
            style={{
              flexGrow: 1,
              maxWidth: `calc(100% - 47px)`,

              margin: '1px 0 0 1px',
              // margin: 3,
            }}
            initialPanelState={panelState}
            setPanelState={setPanelState}
            initialDocumentsState={docPanelState}
            setDocumentState={setDocPanelState}
            documents={getCurrentDocuments()}
            panels={getCurrentPanels()}
          />
        </div>
        <StatusBar initialStatuses={['Welcome to the Breaditor', '❤', '🦵']} />
      </div>
    </WindowProxy>
  );
}

function init() {
  const domNode = document.getElementById('react-root') as Element;
  console.log(domNode, 'domNode');
  const root = createRoot(domNode);

  root.render(<App />);
}

//TODO: eslint-plugin-import, force import/order for bottom-of-file exporting ONLY

export {init, getCurrentPanels, getCurrentDocuments};