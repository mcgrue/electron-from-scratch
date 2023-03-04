import React from 'react';
import {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Dockable, PanelState} from 'react-dockable-ts';

function App(): JSX.Element {
  const mainLayout = [
    {
      windows: [
        {
          selected: 0,
          widgets: ['Tools'],
        },
      ],
      size: 48,
      minSize: 48,
      maxSize: 48,
    },
    {
      windows: [
        {
          selected: 0,
          widgets: ['Map'],
        },
      ],
    },
    {
      windows: [
        {
          selected: 0,
          widgets: ['TestE', 'TestF'],
        },
        {
          selected: 0,
          widgets: ['TestG', 'TestH'],
        },
        {
          selected: 0,
          widgets: ['TestI', 'TestJ'],
        },
      ],
    },
  ];
  const [panelState, setPanelState] = useState<PanelState[]>(mainLayout);

  return (
    <div style={{height: '100vh', backgroundColor: 'red'}}>
      <Dockable
        initialState={panelState}
        onUpdate={(state) => {
          setPanelState(state);
        }}
        spacing={3}
      >
        <Widget id="Tools" title="Test A" />
        <Widget id="Map" title="Test B" />
        <Widget id="TestE" title="Test E" />
        <Widget id="TestF" title="Test F" />
        <Widget id="TestG" title="Test G" />
        <Widget id="TestH" title="Test H" />
        <Widget id="TestI" title="Test I" />
        <Widget id="TestJ" title="Test J" />
      </Dockable>
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
