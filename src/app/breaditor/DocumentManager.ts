import {MapDocument} from './documents/MapDocument';
import {SpriteDocument} from './documents/SpriteDocument';
import {TextDocument} from './documents/TextDocument';
import {updateStatusBar} from '../layout/components/StatusBar';
import {DocumentInfo, WidgetInfo} from '../../../types/global.d';

// @ts-ignore
import emoji from 'emoji-dictionary';

type DocumentType = 'MAP' | 'SPRITE' | 'TEXT';
type BreaditorDocument = MapDocument | SpriteDocument | TextDocument;
type NullableBreaditorDocument = BreaditorDocument | null;

function getWidgetInfo(): WidgetInfo[] {
  return demoInitialPanelInfo;
}
function getDocumentInfo(): DocumentInfo[] {
  return demoInitialDocumentInfo;
}

const demoInitialPanelInfo: WidgetInfo[] = [
  {id: 'PanelA', title: 'Panel A'},
  {id: 'PanelB', title: 'Panel B'},
  {id: 'PanelC', title: 'Panel C'},
  {id: 'PanelD', title: 'Panel D'},
  {id: 'PanelE', title: 'Panel E'},
  {id: 'PanelF', title: 'Panel F'},
];

const demoInitialDocumentInfo: DocumentInfo[] = [
  {id: 'DocA', title: 'Doc A', type: 'MAP'},
  {id: 'DocB', title: 'Doc B', type: 'MAP'},
];

type SpecificMap<K extends string> = {
  [key in K]: string[];
};
type _DocTypeMap = SpecificMap<DocumentType>;
type DocTypeMap = _DocTypeMap & {
  [key: string]: never;
};

// @ts-ignore WHY THIS NEEDS TO BE IGNORED, I DONT UNDERSTAND
const ValidPanelsForDocumentType: DocTypeMap = {
  MAP: ['Layers', 'Info', 'Entities', 'Zones', 'Screenview'],
  SPRITE: ['Info', 'Palette'],
  TEXT: ['Todo'],
};

let _uuid_inc = 1;
function uuid() {
  ++_uuid_inc;

  return 'uuid_' + _uuid_inc;
}

function addDocument(doc: BreaditorDocument) {
  const myUuid = uuid();

  if (doc.info.id) {
    throw new Error(`This Document already has an id?! ${doc.info.id}`);
  }

  if (getDocumentById(myUuid)) {
    throw new Error(`Attempted to double-add a document?! ${doc.info.id}`);
  }

  doc.info.id = myUuid;

  if (_activeDocument === null) {
    _activeDocument = doc;
  }

  _docs.push(doc);
}

function removeDocument(docObjOrStringId: BreaditorDocument | string) {
  if (typeof docObjOrStringId == 'string') {
    _removeDocumentById(docObjOrStringId);
  } else {
    _removeDocumentById(docObjOrStringId.info.id);
  }
}

function _removeDocumentById(id: string) {
  let indexToRemove: number | null = null;
  let indexToBecomeActive: number | null = null;
  for (let index = 0; index < _docs.length; index++) {
    const doc = _docs[index];
    if (doc.info.id === id) {
      indexToRemove = index;
      break;
    }
  }

  if (indexToRemove === null) {
    throw new Error(`Document (${id}) was not in the active document list`);
  }

  if (indexToRemove !== 0) {
    indexToBecomeActive = indexToRemove - 1;
  } else if (_docs.length !== 1) {
    indexToBecomeActive = indexToRemove + 1;
  }

  const newActiveObj = // store now while the index makes sense, make active after delete
    indexToBecomeActive === null ? null : _docs[indexToBecomeActive];

  const oldSize = _docs.length;
  _docs = _docs.filter((obj) => obj.info.id !== id);
  if (oldSize === _docs.length) {
    throw new Error(`Document (${id}) was not in the active document list`);
  }

  if (newActiveObj === null) {
    _activeDocument = null;
  } else {
    focusDocument(newActiveObj.info.id);
  }
}

function getDocuments(): BreaditorDocument[] {
  return _docs;
}

function activeDocument(): NullableBreaditorDocument {
  return _activeDocument;
}

let _activeDocument: NullableBreaditorDocument = null;
let _docs: BreaditorDocument[] = [];

function _TEST_reset() {
  _docs = [];
  _activeDocument = null;
}

function focusDocument(id: string) {
  let myDoc: NullableBreaditorDocument = getDocumentById(id);

  if (myDoc == null) {
    debugger;
    throw new Error('No doc?!');
  } else {
    myDoc = myDoc as BreaditorDocument;
    const getEmoji = () => {
      const randomIndex = Math.floor(Math.random() * emoji.length);
      return emoji[randomIndex];
    };

    updateStatusBar([
      `Document ${myDoc.info.title}`,
      getEmoji(),
      getEmoji(),
      getEmoji(),
    ]);

    _activeDocument = myDoc;
  }
}

function getDocumentById(id: string) {
  let myDoc: NullableBreaditorDocument = null;
  _docs.map((d) => {
    if (d.info.id == id) {
      if (myDoc == null) {
        myDoc = d;
      } else {
        debugger;
        throw new Error('Two docs with the same key?!');
      }
    }
  });
  return myDoc;
}

export {
  focusDocument,
  activeDocument,
  getDocuments,
  addDocument,
  removeDocument,
  getWidgetInfo,
  getDocumentInfo,
  _TEST_reset,
};

export type {DocumentType, BreaditorDocument, NullableBreaditorDocument};
