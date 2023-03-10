import assertType from 'assert';
import {DocumentType} from '../src/app/breaditor/DocumentManager';

//it's a kind of magic!
declare global {
  var assert: typeof assertType;
}

interface DocumentInfo {
  id: string;
  title: string;
  type: DocumentType;
}

interface WidgetInfo {
  id: string;
  title: string;
}

interface Vec2xy {
  x: number;
  y: number;
}

/*
export type SpecificMap<K extends string> = {
  [key in K]: string[];
};
*/

// export type {DocumentType, SpecificMap};
// export {WidgetInfo, Vec2xy};
