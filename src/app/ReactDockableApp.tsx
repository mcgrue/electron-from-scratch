import React from 'react';
import {createRoot} from 'react-dom/client';
import {WindowProxy} from './layout/components/WindowProxy';
import {MenuBar} from './layout/components/MenuBar';
import {ToolBar} from './layout/components/ToolBar';
import {PropertyBar} from './layout/components/PropertyBar';
// @ts-ignore
import css from './ReactDockableApp.module.css';

import {TOOLS} from './tools/constants';

function App() {
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
            <div
              style={{
                backgroundColor: 'red',
                width: '100%',
                height: '100%',
              }}
            ></div>
          </div>
        </div>
      </div>
    </WindowProxy>
  );
}

/*
type WidgetTypes = {
  id: string;
  title: string;
};


function Widget({id, title}: WidgetTypes) {
  return <div>{title} test</div>;
}
*/

export function init() {
  const domNode = document.getElementById('react-root') as Element;
  console.log(domNode, 'domNode');
  const root = createRoot(domNode);

  root.render(<App />);
}
