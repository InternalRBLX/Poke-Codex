import { Config } from './Interfaces/Config';
import * as File from './config/config.json';
import { Bot } from './client/Client';

new Bot().start(File as Config);
