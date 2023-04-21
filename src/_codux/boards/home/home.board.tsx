import React from 'react';
import { createBoard } from '@wixc3/react-board';
import Home from '../../../Pages/temp/Home.jsx';

export default createBoard({
    name: 'Home',
    Board: () => <Home />
});
