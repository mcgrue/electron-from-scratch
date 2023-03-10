/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {App} from './ReactDockableApp';

describe('App', () => {
  it('renders the component correctly', () => {
    render(<App />);

    const app = screen.getByTestId('breaditor-browser-app');
    const workspaceArea = screen.getByTestId('breaditor-browser-workspacearea');
    const statusBar = screen.getByTestId('breaditor-browser-statusbar');

    expect(app).toBeInTheDocument();
    expect(statusBar).toHaveTextContent('Welcome to the Breaditor');
    expect(workspaceArea).not.toHaveTextContent('Panel A');
  });
});
