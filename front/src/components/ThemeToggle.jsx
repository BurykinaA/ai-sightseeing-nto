import React from 'react';

import '../App.css';
import {DarkThemeToggle, Flowbite} from 'flowbite-react';

function ThemeToggle( ) {
  return (
    <Flowbite>
      <DarkThemeToggle className='mx-3'/>
    </Flowbite>
  );
}

export default ThemeToggle;

