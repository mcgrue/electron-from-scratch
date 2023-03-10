/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
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

  it('We can click on menu items', async () => {
    const {getByText} = render(<App />);

    const menuBar = screen.getByTestId('breaditor-browser-menubar');

    expect(menuBar).not.toHaveTextContent('Panels on');

    userEvent.click(getByText('Test'));
    await waitFor(() => screen.findByTestId('breaditor-menubar-contextmenu'));

    expect(menuBar).toHaveTextContent('Panels on');
    const openMenu = screen.getByTestId('breaditor-menubar-contextmenu');
    expect(openMenu).toHaveTextContent('Panels on');
  });

  it('Toggle the panels on', async () => {
    const {getByText} = render(<App />);

    expect(screen.queryByText('Panel A')).toBeNull();

    userEvent.click(getByText('Test'));
    await waitFor(() => screen.findByTestId('breaditor-menubar-contextmenu'));
    userEvent.click(getByText('Panels on'));

    await waitFor(() => screen.findByText('Panel A'));
  });
});
