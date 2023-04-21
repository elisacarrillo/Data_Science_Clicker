import React from 'react';
import { createBoard } from '@wixc3/react-board';
import AuthProvider from '../../../Helpers/AuthProvider';

export default createBoard({
    name: 'AuthProvider',
    Board: () => <AuthProvider children=''/>
});
