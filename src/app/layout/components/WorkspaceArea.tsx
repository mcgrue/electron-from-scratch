import React, {useState, Dispatch, SetStateAction} from 'react';
import {Dockable, PanelState} from 'react-dockable-ts';
import {DocumentInfo, WidgetInfo} from '../../../../types/global';

interface WorkspaceAreaProps {
  style: any;
  initialPanelState: PanelState[];
  setPanelState: Dispatch<SetStateAction<PanelState[]>>;
  initialDocumentsState: PanelState[];
  setDocumentState: Dispatch<SetStateAction<PanelState[]>>;

  documents: DocumentInfo[];
  panels: WidgetInfo[];
}
const WorkspaceArea: React.FC<WorkspaceAreaProps> = (props) => {
  const [layoutState, setLayoutState] = useState<PanelState[]>([
    {
      windows: [
        {
          selected: 0,
          widgets: ['documents-container'],
          hideTabs: true,
        },
      ],
    },
    {
      windows: [
        {
          selected: 0,
          widgets: ['panels-container'],
          hideTabs: true,
        },
      ],
    },
  ]);

  return (
    <Dockable
      initialState={layoutState}
      onUpdate={(state) => {
        setLayoutState(state);
      }}
      spacing={3}
    >
      <div
        title={'Documents (Should Be Hidden)'}
        id={'documents-container'}
        style={{
          display: 'flex',
          flexGrow: 1,
          width: '100%',
          height: '100%',
        }}
      >
        <Dockable
          initialState={props.initialDocumentsState}
          onUpdate={(state) => {
            props.setDocumentState(state);
          }}
        >
          {props.documents.map((doc) => {
            console.log('doc', doc);
            return <Widget key={doc.id} id={doc.id} title={doc.title} />;
          })}
        </Dockable>
      </div>
      <div
        title={'Panels (Should Be Hidden)'}
        id={'panels-container'}
        style={{
          display: 'flex',
          flexGrow: 1,
          width: '100%',
          height: '100%',
        }}
      >
        <Dockable
          initialState={props.initialPanelState}
          onUpdate={(state) => {
            props.setPanelState(state);
          }}
        >
          {props.panels.map((panel) => {
            console.log('panel', panel);
            return <Widget id={panel.id} key={panel.id} title={panel.title} />;
          })}
        </Dockable>
      </div>
    </Dockable>
  );
};

type WidgetTypes = {
  id: string;
  title: string;
};

function Widget({id, title}: WidgetTypes) {
  return <div key={id}>{title} test</div>;
}

export {WorkspaceArea};
