import React, {/*useState, useReducer,*/ Dispatch, SetStateAction} from 'react';
import {Dockable, PanelState} from 'react-dockable-ts';
// import {DocumentInfo, WidgetInfo} from '../../../../types/global';

interface WorkspaceAreaProps {
  style: any;
  initialPanelState: PanelState[];
  setPanelState: Dispatch<SetStateAction<PanelState[]>>;
  initialDocumentsState: PanelState[];
  setDocumentState: Dispatch<SetStateAction<PanelState[]>>;

  //documents: DocumentInfo[];
  //panels: WidgetInfo[];
}

/*

        {props.documents.map((doc) => {
          console.log('doc', doc);
          return <Widget id={doc.id} title={doc.title} />;
        })}

        {props.panels.map((panel) => {
          console.log('panel', panel);
          return <Widget id={panel.id} title={panel.title} />;
        })}

*/

const WorkspaceArea: React.FC<WorkspaceAreaProps> = (props) => {
  return (
    <Dockable
      initialState={props.initialPanelState}
      onUpdate={(state) => {
        props.setPanelState(state);
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
          <Widget id="DocA" title="AAA" />
          <Widget id="DocB" title="BBB" />
        </Dockable>
      </div>
      <Widget id="PanelA" title="AAA" />
      <Widget id="PanelB" title="BBB" />
      <Widget id="PanelC" title="CCC" />
      <Widget id="PanelD" title="DDD" />
      <Widget id="PanelE" title="EEE" />
      <Widget id="PanelF" title="FFF" />
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
