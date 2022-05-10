import { Console } from 'console';
import { Transform } from 'stream';

const chalk = require('chalk');
const figlet = require('figlet');
const terminalLink = require('terminal-link');

import {
  applyStyle,
  getParsedUtilities,
  generateWhiteSpace
} from './style';

const helpers = {
  table: (input: string[], style = null): void => {
    // @see https://stackoverflow.com/a/67859384
    const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } })
    const logger = new Console({ stdout: ts })
    logger.table(input)
    const table = (ts.read() || '').toString()
    let result = '';

    let margin = '';

    if(style) {
      const { ml } = getParsedUtilities(style.split(' '));
      if(ml) margin = generateWhiteSpace(ml);
    }

    for (let row of table.split(/[\r\n]+/)) {
      let r = row.replace(/[^┬]*┬/, margin + ' ┌');
      r = r.replace(/^├─*┼/, margin + ' ├');
      r = r.replace(/│[^│]*/, margin + ' ');
      r = r.replace(/^└─*┴/, margin + ' └');
      r = r.replace(/'/g, ' ');
      result += `${r}\n`;
    }

    applyStyle(result, style);
  },
  title: (input: string, style = null, font = "Standard"): void => {

    if(style) {
      const { ml } = getParsedUtilities(style.split(' '));
      if(ml) input = input.padStart(ml * 2);
    }

    const stdout = figlet.textSync(input, {
      horizontalLayout: 'fitted',
      font
    });
    applyStyle(stdout, style);
  },
  text: (input: string, style = null): void => applyStyle(input, style),
  link: (input: string, link: string, style = null): void => {

    let margin = '';

    if(style) {
      const { ml } = getParsedUtilities(style.split(' '));
      if(ml) margin = generateWhiteSpace(ml);
    }
    applyStyle(margin  + terminalLink(input, link), style);
  }
};

export default helpers;
