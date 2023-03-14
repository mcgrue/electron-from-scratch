import React from 'react';
import {dispatch} from '../../app/state-management/in-memory/dispatch';

// import {getCurrentPanels} from '../ReactDockableApp';

function Logo() {
  return (
    <svg
      viewBox="0 0 108 132"
      style={{
        width: '100%',
        height: '100%',
        // filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.5))"
      }}
    >
      <path
        fillRule="evenodd"
        fill="rgb(255, 255, 255)"
        d="M104.912,59.343 L81.627,82.627 L85.113,86.113 C86.675,87.675 86.675,90.207 85.113,91.770 L56.828,120.054 C55.266,121.616 52.734,121.616 51.172,120.054 L22.887,91.770 C21.325,90.207 21.325,87.675 22.887,86.113 L26.373,82.627 L3.088,59.343 C-0.036,56.219 -0.036,51.154 3.088,48.029 L48.343,2.775 C51.467,-0.350 56.533,-0.350 59.657,2.775 L104.912,48.029 C108.036,51.154 108.036,56.219 104.912,59.343 ZM85.113,50.858 L56.828,22.574 C55.266,21.011 52.734,21.011 51.172,22.574 L22.887,50.858 C21.325,52.420 21.325,54.953 22.887,56.515 L37.686,71.314 L51.172,57.828 C52.734,56.266 55.266,56.266 56.828,57.828 L70.314,71.314 L85.113,56.515 C86.675,54.953 86.675,52.420 85.113,50.858 Z"
      />
    </svg>
  );
}

/*
function getWidgetVisibilityOptions() {
  return getCurrentPanels().reduce((obj: any, widget: any) => {
    obj[widget.title] = {
      function: () => {
        dispatch({
          type: 'SET_HIDDEN',
          widget: widget.id,
          // hidden: !this.props.hidden[widget.id],
        });
      },
      // value: !this.props.hidden[widget.id],
    };
    return obj;
  }, {});
}
*/

function getMenu() {
  return [
    {
      name: (
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 1,
            pointerEvents: 'none',
          }}
        >
          <Logo />
        </div>
      ),
      actions: [
        {
          type: 'actions',
          actions: {
            'Icon Thing': function () {
              console.log('I did the Icon thing');
            },
          },
        },
      ],
    },
    {
      name: 'File',
      actions: [
        {
          type: 'actions',
          actions: {
            'New Document': () => {
              dispatch({
                type: 'DOC_CREATE_NEW',
              });
            },
            'File Thing': function () {
              console.log('I did the File thing');
            },
          },
        },
      ],
    },
    {
      name: 'Test',
      actions: [
        {
          type: 'actions',
          actions: {
            'Panels on': function () {
              dispatch({type: 'TEST_ON'});
            },
            'Panels off': function () {
              dispatch({type: 'TEST_OFF'});
            },
          },
        },
      ],
    },
    /*
    {
      name: 'Edit',
      actions: [
        {
          type: 'actions',
          actions: {
            'Edit Thing': function () {
              console.log('I did the Edit thing');
            },
          },
        },
      ],
    },
    {
      name: 'Image',
      actions: [
        {
          type: 'actions',
          actions: {
            'Image Thing': function () {
              console.log('I did the Image thing');
            },
          },
        },
      ],
    },
    {
      name: 'View',
      actions: [
        {
          type: 'actions',
          actions: {
            'View Thing': function () {
              console.log('I did the View thing');
            },
          },
        },
      ],
    },
    {
      name: 'Window',
      actions: [
        {
          type: 'actions',
          actions: {
            'New Document View': () => {
              dispatch({
                type: 'CREATE_NEW_DOCUMENT_VIEW',
              });
            },
          },
        },
        {
          type: 'bools',
          options: getWidgetVisibilityOptions(),
        },
      ],
    },
    {
      name: 'Help',
      actions: [
        {
          type: 'actions',
          actions: {
            'Help Thing': function () {
              console.log('I did the Help thing');
            },
          },
        },
      ],
    },
    */
  ];
}

export {getMenu};
