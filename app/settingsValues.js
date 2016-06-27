import * as colors from './colors';

export const FIBONACCI = 'fibonacci';
export const TSHIRT_SIZING = 'tshirt-sizing';
export const PLANNING_POKER = 'planning-poker';

export const COLOR_BLUE = 'Blue';
export const COLOR_PURPLE = 'Purple';
export const COLOR_GREEN = 'Green';
export const COLOR_ORANGE = 'Orange';
export const COLOR_RED = 'Red';

export const SEQUENCE_OPTIONS = [
  {
    value: PLANNING_POKER,
    label: 'Planning poker',
  }, {
    value: FIBONACCI,
    label: 'Fibonacci',
  }, {
    value: TSHIRT_SIZING,
    label: 'T-Shirt Sizing',
  }
];

export const CARDS_FOR_SEQUENCE = {
  [PLANNING_POKER]: ['0', '½', '1', '2', '3', '5', '8', '13', '20', '40', '100'],
  [FIBONACCI]:      ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55'],
  [TSHIRT_SIZING]: ['XS', 'S', 'M', 'L', 'XL'],
}

export const MAX_CARD_OPTIONS = {
  [PLANNING_POKER]: ['8', '13', '20', '40', '100'],
  [FIBONACCI]: ['8', '13', '21', '34', '55'],
  [TSHIRT_SIZING]: ['L', 'XL'],
};

export const COLOR_OPTIONS = [
  COLOR_BLUE,
  COLOR_PURPLE,
  COLOR_GREEN,
  // COLOR_ORANGE,
  COLOR_RED,
]

export const COLORS = {
  [COLOR_BLUE]: colors.blue,
  [COLOR_PURPLE]: colors.purple,
  [COLOR_GREEN]: colors.green,
  [COLOR_RED]: colors.red,
}

export const TINT_FOR_COLOR = {
  [COLOR_BLUE]: "#3498db",
  [COLOR_PURPLE]: "#8e44ad",
  [COLOR_GREEN]: "#27ae60",
  [COLOR_RED]: "#c0392b",
}