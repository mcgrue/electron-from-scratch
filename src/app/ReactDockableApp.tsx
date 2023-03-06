import React from 'react';
import {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Dockable, PanelState} from 'react-dockable-ts';
import {WindowProxy} from './layout/components/WindowProxy';
import {MenuBar} from './layout/components/MenuBar';

import css from './ReactDockableApp.module.css';

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
      </div>
    </WindowProxy>
  );
}

type WidgetTypes = {
  id: string;
  title: string;
};

function Widget({id, title}: WidgetTypes) {
  return <div>{title} test</div>;
}

export function init() {
  const domNode = document.getElementById('react-root');
  const root = createRoot(domNode);

  root.render(<App />);
}
