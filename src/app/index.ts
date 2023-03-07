import {init} from './ReactDockableApp';

// @ts-ignore
import css from './globals.module.css';

function appendGlobalCss() {
  const head = document.head;
  const style = document.createElement('style');
  style.type = 'text/css';

  style.textContent = css;
  head.appendChild(style);
}

function startApp() {
  appendGlobalCss();
  init();
}

// @ts-ignore
window['startApp'] = startApp;

export {appendGlobalCss, startApp};
