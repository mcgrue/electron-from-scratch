import React from 'react';
import {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Dockable, PanelState} from 'react-dockable-ts';

function App() {
  const [documentPanelState, setDocumentPanelState] = useState<PanelState[]>([
    {
      windows: [
        {
          selected: 0,
          widgets: ['Test_4', 'Test_5', 'Test_6'],
        },
      ],
    },
  ]);
  const [auxPanelState, setAuxPanelState] = useState<PanelState[]>([
    {
      windows: [
        {
          selected: 0,
          widgets: ['Test_8', 'Test_9', 'Test_10', 'Test_11'],
        },
      ],
    },
  ]);

  function MenuBar() {
    return <div></div>;
  }

  function ToolRibbon() {
    return <div></div>;
  }

  function ToolBar() {
    return <div></div>;
  }

  function StatusBar() {
    return <div></div>;
  }

  return (
    <div style={{height: '100vh', backgroundColor: 'red'}}>
      <MenuBar />
      <ToolRibbon />
      <div>
        <ToolBar />
        <Dockable
          initialState={documentPanelState}
          onUpdate={(state) => {
            setDocumentPanelState(state);
          }}
          spacing={3}
        >
          <Widget id="Test_4" title="Map Document" />
          <Widget id="Test_5" title="Text Document" />
          <Widget id="Test_6" title="Sprite Document" />
        </Dockable>
        <Dockable
          initialState={auxPanelState}
          onUpdate={(state) => {
            setAuxPanelState(state);
          }}
          spacing={3}
        >
          <Widget id="Test_8" title="Panel 1" />
          <Widget id="Test_9" title="Panel 2" />
          <Widget id="Test_10" title="Panel 3" />
          <Widget id="Test_11" title="Panel 4" />
        </Dockable>
      </div>
      <StatusBar />
    </div>
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
