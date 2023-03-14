import {setOnOrOff} from '../../ReactDockableApp';
import {focusDocument} from '../../breaditor/DocumentManager';

interface DispatchMessage {
  [key: string]: any; // allow any additional properties
  type: String;
}

type TestMessage = {
  type: 'TEST_ON' | 'TEST_OFF';
} & DispatchMessage;

type DocumentMessage = {
  type: 'DOC_FOCUS';
  document_id: string;
} & DispatchMessage;

type DocumentNewMessage = {
  type: 'DOC_CREATE_NEW';
} & DispatchMessage;

function _TEST_CLEAR() {
  // @ts-ignore
  _TEST_CAPTURE = (any: any) => {};
}

// @ts-ignore
let _TEST_CAPTURE = function _TEST_CAPTURE(any: any) {}; // blank in production

type ValidDispatchMessage = TestMessage | DocumentMessage | DocumentNewMessage;

const dispatch = (message: ValidDispatchMessage) => {
  _TEST_CAPTURE(message);

  console.info('DISPATCHING', message);
  switch (message.type) {
    case 'TEST_ON':
      setOnOrOff(true);
      return;
    case 'TEST_OFF':
      setOnOrOff(false);
      return;
    case 'DOC_FOCUS':
      focusDocument(message.document_id);
      return;
    default:
      console.warn('UNHANDLED');
  }
};

export {dispatch, _TEST_CAPTURE, _TEST_CLEAR};
