import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { WrappedApp, App } from './App';


describe('App', () => {
    it('Renders hello', () => {
        //ARRAGE
        render(<WrappedApp />);
        // ACT
        
        // EXPECT
        expect(screen.getByRole('heading', {
            level:1
        })).toHaveTextContent('hello');
    });
    it('Renders not found if invalid path', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );
    });
});