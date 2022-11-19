import * as React from 'react';
import Dockable from 'react-dockable';
import initialState from './initialState';

let activeDocument: any = null;

export const setActiveDocument = (doc: any) => {
  activeDocument = doc;
};

export function App() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'red',
      }}
    >
      TACO
    </div>
  );
}
