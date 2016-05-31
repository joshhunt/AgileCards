export const FIBONACCI = 'fibonacci';
export const TSHIRT_SIZING = 'tshirt-sizing';
export const PLANNING_POKER = 'planning-poker';

export const SEQUENCE_OPTIONS = [
  {
    value: PLANNING_POKER, // ['0', '½', '1', '2', '3', '5', '8', '13', '20', '40', '100'],
    label: 'Planning poker',
  }, {
    value: FIBONACCI,      // ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55'],
    label: 'Fibonacci',
  }, {
    value: TSHIRT_SIZING,  // ['XS', 'S', 'M', 'L', 'XL'],
    label: 'T-Shirt Sizing',
  }
];

export const CARDS_FOR_SEQUENCE = {
  [PLANNING_POKER]: ['0', '½', '1', '2', '3', '5', '8', '13', '20', '40', '100'],
  [FIBONACCI]: ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55'],
  [TSHIRT_SIZING]: ['XS', 'S', 'M', 'L', 'XL'],
}

export const MAX_CARD_OPTIONS = {
  [PLANNING_POKER]: ['8', '13', '20', '40', '100'],
  [FIBONACCI]: ['8', '13', '21', '34', '55'],
  [TSHIRT_SIZING]: ['L', 'XL'],
};