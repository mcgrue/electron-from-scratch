import {
  _TEST_reset,
  activeDocument,
  addDocument,
  focusDocument,
  getDocuments,
  removeDocument,
} from './DocumentManager';
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

test('addDocument creates unique ids to documents in the Widget Info', () => {
  const map1 = mapMaker('Test Map A');
  const map2 = mapMaker('Test Map B');

  expect(map1.info.id).toBeFalsy();
  expect(map2.info.id).toBeFalsy();

  addDocument(map1);
  addDocument(map2);

  expect(map1.info.id).toBeTruthy();
  expect(map2.info.id).toBeTruthy();

  expect(map1.info.id).not.toBe(map2.info.id);
});

test('getDocuments works', () => {
  const map1 = mapMaker('Test Map A');
  const map2 = mapMaker('Test Map B');
  const map3 = mapMaker('Test Map C');

  const map4 = mapMaker('Test Map C');

  addDocument(map1);
  addDocument(map2);
  addDocument(map3);

  const allDocs = getDocuments();

  expect(allDocs.length).toBe(3);
  expect(allDocs.some((item) => item === map1)).toBeTruthy();
  expect(allDocs.some((item) => item === map2)).toBeTruthy();
  expect(allDocs.some((item) => item === map3)).toBeTruthy();
  expect(allDocs.some((item) => item === map4)).toBeFalsy();
});

test('removeDocument works', () => {
  const map1 = mapMaker('Test Map A');
  const map2 = mapMaker('Test Map B');
  const map3 = mapMaker('Test Map C');

  const okayThing = function okayThing() {};

  okayThing();

  addDocument(map1);
  addDocument(map2);
  addDocument(map3);

  expect(getDocuments().length).toBe(3);

  removeDocument(map2);

  expect(getDocuments().length).toBe(2);

  expect(getDocuments().length).toBe(2);
  expect(getDocuments().some((item) => item === map1)).toBeTruthy();
  expect(getDocuments().some((item) => item === map2)).toBeFalsy();
  expect(getDocuments().some((item) => item === map3)).toBeTruthy();
});

test('removeDocument throws exception if you try to remove something not in it', () => {
  const map1 = mapMaker('Test Map A');
  const map2 = mapMaker('Test Map B');

  addDocument(map1);
  addDocument(map2);

  const map3 = mapMaker('Test Map C');
  const blowUp = function blowUp() {
    removeDocument(map3);
  };

  expect(blowUp).toThrowError(
    'Document () was not in the active document list',
  );

  const map4 = mapMaker('Test Map D');
  map4.info.id = 'Some bogus id';
  const blowUpAgain = function blowUp() {
    removeDocument(map4);
  };
  expect(blowUpAgain).toThrowError(
    'Document (Some bogus id) was not in the active document list',
  );
});

test('Deleting the active document will make the document to its left active, if possible', () => {
  const map1 = mapMaker('Test Map A');
  const map2 = mapMaker('Test Map B');
  const map3 = mapMaker('Test Map C');
  addDocument(map1);
  addDocument(map2);
  addDocument(map3);

  expect(map1).toBe(activeDocument());
  focusDocument(map3.info.id);
  expect(map3).toBe(activeDocument());
  removeDocument(map3);
  expect(map2).toBe(activeDocument());
});

test('Deleting the leftmost active document will make the new leftmost document active, if possible', () => {
  const map1 = mapMaker('Test Map A');
  const map2 = mapMaker('Test Map B');
  const map3 = mapMaker('Test Map C');
  addDocument(map1);
  addDocument(map2);
  addDocument(map3);

  expect(map1).toBe(activeDocument());
  removeDocument(map1);
  expect(map2).toBe(activeDocument());
});

test('Deleting the last document will result in a null active document', () => {
  const map1 = mapMaker('Test Map A');
  addDocument(map1);

  expect(map1).toBe(activeDocument());
  removeDocument(map1);
  expect(activeDocument()).toBeNull();
});
