import {activeDocument, addDocument, _TEST_reset} from './DocumentManager';
import {mapMaker} from '../breaditor/documents/MapDocument';
/*

  focusDocument,
  activeDocument,
  addDocument,
  getWidgetInfo,
  getDocumentInfo,

*/

beforeEach(() => {
  _TEST_reset();
});

test('the first added document defaults active', () => {
  expect(activeDocument()).toBe(null);
  const myDoc = mapMaker('Test Map A');
  addDocument(myDoc);
  expect(activeDocument()).toBe(myDoc);
});

test('uninitialized activeDocument returns null', () => {
  expect(activeDocument()).toBe(null);
});

export {};
