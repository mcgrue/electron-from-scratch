import React from 'react';

// responsible for interacting with the maaaaap.
interface MapDocumentProps {}

const MapDocument: React.FC<MapDocumentProps> = (props) => {
  console.log(props);
  return (
    <div>
      <h1>I am a map. Trust me.</h1>
    </div>
  );
};

export {MapDocument};
