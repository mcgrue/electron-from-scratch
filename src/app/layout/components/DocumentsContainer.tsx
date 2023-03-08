import React from 'react';
import Dockable from 'react-dockable-ts';
import {MapDocument} from '../../breaditor/documents/MapDocument';

interface DocumentsContainerProps {
  state: any;
  dispatch: (arg: any) => void;
  currentTool: any;
  unhidable?: boolean;
}

const DocumentsContainer: React.FC<DocumentsContainerProps> = (props) => {
  // Manages the Dockable container of Documents

  let {state, dispatch} = props;

  return (
    <div style={{display: 'flex', flexGrow: 1, width: '100%', height: '100%'}}>
      <Dockable
        initialState={state.documents.workspace}
        spacing={3}
        active={state.documents.activeDocument}
        // hideMenus
        hideTabs={state.documents.views.length <= 1}
      >
        {state.documents.views.map(() => (
          <MapDocument />
        ))}
      </Dockable>
    </div>
  );
};

export {DocumentsContainer};
