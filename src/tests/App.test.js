//impprt render from testing library
import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
//test function with name 'renders app'
test('renders app', () => {
    //set a snapshot of the dom tree using asFragment and setting it to render the App component
    const { asFragment } = render (<App />)
    //expect asFragment(snapshot of dom tree) to match the intital snapshot of the dom tree
    expect( asFragment()).toMatchSnapshot()
});
