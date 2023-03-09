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
window['startApp'] = startApp; //we call this in the index.html after loading to bootstrap.
// we don't call it here so we don't init anything for unit testing

export {appendGlobalCss, startApp};
