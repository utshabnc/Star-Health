import _ from 'lodash';
const addAlpha = (color: string, opacity: number): string => {
  // coerce values so it is between 0 and 1.
  const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
};

const colorGradient = (idx: number) =>
  addAlpha('#4F2FED', Math.max(1 - (1 + idx) * 0.08, 0.1));

const availableYears = [2021, 2020, 2019, 2018, 2017, 2016];

const formatMoney = (amount: number, decimals = 2) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    maximumFractionDigits: decimals,
    currency: 'USD',
  });

  return formatter.format(amount);
};

const formatNumber = (amount: number, decimals = 2) => {
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimals,
  });

  return formatter.format(amount);
};

const drugTypes = [
  'antibiotic',
  'antidiabetic',
  'anti-inflammatory',
  'antineoplastic',
  'antiviral',
  'cancer',
  'corticosteroid',
  'enzyme',
  'hormone',
  'kinase inhibitor',
  'monoclonal antibody',
  'opioid',
  'other',
  'receptor antagonist',
];

const formatName = (text: string) =>
  _.map(text.split(' '), _.capitalize).join(' ');

const formatProductType = (type?: string | null) =>
  type == null || type == 'null' || type == '' ? 'Other' : formatName(type);

const formatProductName = (name?: string | null) =>
  name == null || name == 'null' || name == ''
    ? 'Unknown Product'
    : formatName(name);

export {
  addAlpha,
  colorGradient,
  availableYears,
  formatMoney,
  formatNumber,
  formatName,
  formatProductType,
  formatProductName,
  drugTypes,
};
