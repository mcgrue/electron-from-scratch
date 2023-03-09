import {setOnOrOff} from '../../ReactDockableApp';

interface DispatchMessage {
  [key: string]: any; // allow any additional properties
  type: string;
}

const dispatch = (message: DispatchMessage) => {
  switch (message.type) {
    case 'TEST_ON':
      setOnOrOff(true);
      return;
    case 'TEST_OFF':
      setOnOrOff(false);
      return;
    default:
      console.log('DISPATCHING', message);
  }
};

export {dispatch};
