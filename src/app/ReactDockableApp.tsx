import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {WindowProxy} from './layout/components/WindowProxy';
import {MenuBar} from './layout/components/MenuBar';
import {ToolBar} from './layout/components/ToolBar';
import {PropertyBar} from './layout/components/PropertyBar';
import {StatusBar} from './layout/components/StatusBar';
// import {DocumentsContainer} from './layout/components/DocumentsContainer';
// @ts-ignore
import css from './ReactDockableApp.module.css';

import {TOOLS} from './breaditor/tools/constants';

import {Dockable, PanelState} from 'react-dockable-ts';
//import {TestPanel} from './breaditor/panels/TestPanel';

function App() {
  const [panelState, setPanelState] = useState<PanelState[]>([
    {
      windows: [
        {
          selected: 0,
          widgets: ['TestA', 'TestB'],
        },
      ],
    },
  ]);

  const [docPanelState, setDocPanelState] = useState<PanelState[]>([
    {
      windows: [
        {
          selected: 0,
          widgets: ['DocA', 'DocB'],
        },
      ],
    },
  ]);

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
          dispatch={(foo) => {
            console.log('I am a fake dispatch in ReactDockableApp.  Yay.', foo);
          }}
          widgets={
            {
              /*this.getWidgets()
            .filter((widget) => !widget.props.unhidable)
            .map((widget) => ({
              id: widget.props.id,
              title: widget.props.title,
            }))*/
            }
          }
          hidden={
            {
              /*this.getState().widgets.hidden*/
            }
          }
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
          <div
            style={{
              flexGrow: 1,
              maxWidth: `calc(100% - 47px)`,

              margin: '1px 0 0 1px',
              // margin: 3,
            }}
          >
            <Dockable
              initialState={panelState}
              onUpdate={(state) => {
                setPanelState(state);
              }}
              spacing={3}
            >
              <div
                title={'Documents'}
                id={'documents'}
                style={{
                  display: 'flex',
                  flexGrow: 1,
                  width: '100%',
                  height: '100%',
                }}
              >
                <Dockable
                  key="documents"
                  initialState={docPanelState}
                  onUpdate={(state) => {
                    setDocPanelState(state);
                  }}
                >
                  <Widget id="DocA" title="Doc A" />
                  <Widget id="DocB" title="Doc B" />
                </Dockable>
              </div>

              <Widget id="TestA" title="Test A" />
              <Widget id="TestB" title="Test B" />
            </Dockable>
          </div>
        </div>
        <StatusBar
          state={{}}
          dispatch={(bar) => {
            console.log('Another fake dispatch that was passed: ', bar);
          }}
          tool={TOOLS.Brush}
          view={{}}
        />
      </div>
    </WindowProxy>
  );
}

type WidgetTypes = {
  id: string;
  title: string;
};

function Widget({id, title}: WidgetTypes) {
  return <div key={id}>{title} test</div>;
}

export function init() {
  const domNode = document.getElementById('react-root') as Element;
  console.log(domNode, 'domNode');
  const root = createRoot(domNode);

  root.render(<App />);
}
