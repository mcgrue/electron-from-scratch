import {appendGlobalCss} from './index';
import {JSDOM} from 'jsdom';

// Define a global variable to store the JSDOM instance
let dom: any;

// Set up the testing environment before each test
beforeEach(() => {
  // Create a new JSDOM instance
  dom = new JSDOM('<html><body></body></html>');

  // Set the global window and document objects to the JSDOM instances
  global.window = dom.window;
  global.document = dom.window.document;
});

// Clean up the testing environment after each test
afterEach(() => {
  // Destroy the JSDOM instance
  dom.window.close();
});

test('appendGlobalCss', () => {
  // Get all the <style> elements within the <head> element
  const styleElements = document.head.querySelectorAll('style');

  expect(styleElements.length).toBe(0);
  appendGlobalCss();
  expect(styleElements.length).toBe(1);
});
