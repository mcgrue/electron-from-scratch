import React, {
  useState,
  // useRef,
  //useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import {Dockable, PanelState} from 'react-dockable-ts';
import {DocumentInfo, WidgetInfo} from '../../../../types/global';

import {dispatch} from '../../state-management/in-memory/dispatch';

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
    <div data-testid="breaditor-browser-workspacearea">
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
            onActive={(id) => {
              dispatch({type: 'DOC_FOCUS', document_id: id});
            }}
          >
            {props.documents.map((doc) => {
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
              return (
                <Widget id={panel.id} key={panel.id} title={panel.title} />
              );
            })}
          </Dockable>
        </div>
      </Dockable>
    </div>
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
