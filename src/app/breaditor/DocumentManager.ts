import {MapDocument} from './documents/MapDocument';
import {SpriteDocument} from './documents/SpriteDocument';
import {TextDocument} from './documents/TextDocument';
import {updateStatusBar} from '../layout/components/StatusBar';
import {DocumentInfo, WidgetInfo} from '../../../types/global';

// @ts-ignore
import emoji from 'emoji-dictionary';

type BreaditorDocument = MapDocument | SpriteDocument | TextDocument;

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

// @ts-ignore
const ValidPanelsForDocumentType = {
  Map: ['Layers', 'Info', 'Entities', 'Zones', 'Screenview'],
  Sprite: ['Info', 'Palette'],
  Text: ['Todo'],
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
}

let docs: BreaditorDocument[] = [];
function focusDocument(id: string) {
  let myDoc: BreaditorDocument | null = getDocumentById(id);

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
  }
}

function getDocumentById(id: string) {
  let myDoc: BreaditorDocument | null = null;
  docs.map((d) => {
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

export {focusDocument, addDocument, getWidgetInfo, getDocumentInfo};
