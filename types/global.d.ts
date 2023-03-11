import assertType from 'assert';
import {DocumentType} from '../src/app/breaditor/DocumentManager';

//it's a kind of magic!
declare global {
  var assert: typeof assertType;
}

export interface DocumentInfo {
  id: string;
  title: string;
  type: DocumentType;
}

export interface WidgetInfo {
  id: string;
  title: string;
}

export interface Vec2xy {
  x: number;
  y: number;
}

/*
export type SpecificMap<K extends string> = {
  [key in K]: string[];
};
*/

declare module '*.module.css';

export interface Window {
  electronAPI: {
    appMinimize: () => void;
    appMaximize: () => void;
    appClose: () => void;
  };
}

declare module '*.module.css' {
  const classes: {[key: string]: string};
  export default classes;
}
