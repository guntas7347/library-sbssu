import React from 'react'
import { createBoard } from '@wixc3/react-board';

export default createBoard({
    name: 'Login Page',
    Board: () => <div>
        <form action="Name"><br /><input type="texte" /><br /><label>Last name:</label><br /><input type="text" /><br /><br /><input type="submit" value="Submit" /></form>
    </div>,
    isSnippet: true,
});
