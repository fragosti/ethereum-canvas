// these sizes are arbitrary and you can set them to whatever you wish
import { css, keyframes } from 'styled-components';

export const sizes = {
  giant: 1170,
  desktop: 992,
  tablet: 768,
  phone: 420
}

export const viewPort = {
  width: () => Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
  height: () => Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
}

export const colors = {
  gray: ['#f8f9f9', '#ebedee', '#dee1e3', '#cfd3d6', '#bec4c8', '#acb4b9', '#97a1a7', '#7f8a93', '#5f6e78', '#374047'],
  blue: '#61A7F8',
  orange: '#e65142',
}

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)}
    }
  `
  return accumulator
}, {})

export const zIndex = {};


export const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;