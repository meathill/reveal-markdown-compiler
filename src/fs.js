/**
 * Created by realm on 2017/4/12.
 */

import fs from 'fs';
import {promisify} from 'util';

export const readFile = promisify(fs.readFile);
export const writeFile = promisify(fs.writeFile);