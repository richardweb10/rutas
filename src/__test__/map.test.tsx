import React from 'react';
import {
  render,
  fireEvent,
  waitForElement,
  queryByAttribute,
} from '@testing-library/react';
import App from '../App';

describe('<Rutas />', () => {
  test('El input debe iniciar con 123', async () => {
    const getById = queryByAttribute.bind(null, 'id');
    const dom = render(<App />);
    const ruta = getById(dom.container, 'ruta');
    console.log('ruta: ', (ruta as HTMLInputElement).value);
    expect((ruta as HTMLInputElement).value).toBe('123');
  });
  test('El div de los mapas debe tener información', async () => {
    const getById = queryByAttribute.bind(null, 'id');
    const dom = render(<App />);
    const rutas = getById(dom.container, 'rutas');
    expect((rutas as HTMLDivElement).innerHTML).not.toBe('');
  });
});
