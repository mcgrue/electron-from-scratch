import React from 'react';
import {ReactNode} from 'react';
import {TOOLS} from '../../tools/constants';

// @ts-ignore
import css from './PropertyBar.module.css';

import * as icons from '../../ui/icons';

interface StatusBarProps {
  dispatch: ({}: any) => void;
  state: {};
  tool: {};
  view: {};
}

const StatusBar: React.FC<StatusBarProps> = (props) => {
  function getProperties() {
    switch (props.tool) {
      case TOOLS.Brush:
        return <BrushProperties {...props} />;
      default:
        alert('NO TOOL');
        return null;
    }
  }

  return <div className={css.container}>{getProperties()}</div>;
};

interface PropertyGroupProps {
  children: ReactNode;
}
const PropertyGroup: React.FC<PropertyGroupProps> = (props) => {
  return (
    <div
      style={{
        // height: "100%",
        paddingLeft: 12,
        paddingRight: 12,
        display: 'flex',
        borderLeft: '1px solid rgba(40,40,40,0.75)',
        // padding: "10px 16px"
      }}
    >
      {props.children}
    </div>
  );
};

interface BrushPropertiesProps {
  state: {};
  view: {};
  dispatch: ({}: any) => void;
}
const BrushProperties: React.FC<BrushPropertiesProps> = () => {
  return (
    <>
      <PropertyGroup>Status</PropertyGroup>
      <PropertyGroup>More Status</PropertyGroup>
      <PropertyGroup>Even More Status</PropertyGroup>
      <icons.BrushIcon
        style={{
          width: 36,
          height: 36,
          // padding: "0 6px",
          padding: 6,
          // marginRight: 6,
          fill: 'white',
          right: 6,
          position: 'absolute',
        }}
      />
    </>
  );
};

export {StatusBar};
