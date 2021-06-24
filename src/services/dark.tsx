import React from 'react'

const dark = (toggled: boolean) => {
const body = document.querySelector('body') as HTMLElement;

  if(toggled === true) {
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
  }
}

export default dark
