import {init} from './ReactDockableApp';

import css from './globals.module.css';

function appendGlobalCss() {
  const head = document.head;
  const style = document.createElement('style');
  style.type = 'text/css';
  style.textContent = css;
  head.appendChild(style);
}

appendGlobalCss();
init();
