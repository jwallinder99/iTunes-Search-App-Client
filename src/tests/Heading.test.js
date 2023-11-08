import React from 'react'

import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom'

import App from '../App'

test('Test if typography display iTunes Search', () => {
    render(<App />)
    const heading = screen.getByText('iTunes Search')
    expect(heading).toBeTruthy()
})



