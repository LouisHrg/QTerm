const chalk = require('chalk');
const gradient = require('gradient-string');

export const applyStyle = (input, style): void => {

  if(!style) return console.log(input);

  const styleArr = style.split(' ');

  const utilities = getParsedUtilities(styleArr);
  const hasGradient = mapGradient(styleArr);

  if(hasGradient) input = gradient[hasGradient](input);

  if(utilities.mt) printMarginY(utilities.mt);
  if(utilities.ml) input = input.padStart(utilities.ml * 2);

  const styles = getStyles(styleArr);

  console.log(withTheme(input, styles))

  if(utilities.mb) printMarginY(utilities.mb);

  return;
}

const withTheme = (input, styles) => {

  if(!styles) return input;

  let theme = chalk;

  for (let style of styles) {
    if(!style) continue;
    if(typeof style === 'string') {
      theme = theme[style];
      continue;
    } else {
      theme = theme[style.key](style.value);
      continue;
    }
  }

  return theme(input);
}

const mapClassToChalk = (property) => {
  if(property.indexOf('text-') === 0) return transformTextClass(property);
  if(property.indexOf('text[') === 0) return transformCustomTextClass(property);
  if(property.indexOf('bg-') === 0) return transformBgClass(property);
  if(property.indexOf('bg[') === 0) return transformCustomBgClass(property);
  if(property.indexOf('font-') === 0) return property.split('-')[1];
  return null;
}

const mapGradient = (classes) => {
  const filtered = classes.filter(el => el.indexOf('gradient-') === 0);
  if(filtered[0]) return filtered[0].split('-')[1];
  return null;
}

export const getParsedUtilities = (classes) => {
  return classes.map(el => mapOtherClasses(el))
  .filter(el => el)
  .reduce((acc, x) => {
    for (var key in x) acc[key] = x[key]; return acc;
  }, {});
}

const getStyles = (classes) => classes.map(el => mapClassToChalk(el));

const mapOtherClasses = (property) => {
  if(property.indexOf('mt-') === 0) return { mt: property.split('-')[1] };
  if(property.indexOf('mb-') === 0) return { mb: property.split('-')[1] };
  if(property.indexOf('ml-') === 0) return { ml: property.split('-')[1] };
  return false;
}

const transformTextClass = (str) => str.split('-')[1];

const transformCustomTextClass = (str) => {
  const partial = str.split('[')[1];
  return {
    key: 'hex',
    value: partial.slice(0, partial.length - 1),
  };
}

const transformBgClass = (str) => {
  const partial = str.split('-')[1]
  return `bg${partial.charAt(0).toUpperCase() + partial.slice(1)}`;
}

const transformCustomBgClass = (str) => {
  let partial = str.split('[')[1]
  return {
    key: 'bgHex',
    value: partial.slice(0, partial.length - 1),
  };
}

export const generateWhiteSpace = (nb) => {
  let output = '';
  for (let it = 0; it < nb; it++) {
    output = output + ' ';
  }
  return output;
}

const printMarginY = (nb) => {
  for (let step = 0; step < nb * 2; step++) {
    console.log(' ');
  }

}
