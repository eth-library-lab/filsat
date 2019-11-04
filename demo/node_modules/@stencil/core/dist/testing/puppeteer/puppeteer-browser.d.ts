import * as d from '../../declarations';
import * as puppeteer from 'puppeteer';
export declare function startPuppeteerBrowser(config: d.Config): Promise<any>;
export declare function connectBrowser(): Promise<any>;
export declare function disconnectBrowser(browserContext: puppeteer.BrowserContext): Promise<void>;
export declare function newBrowserPage(browserContext: puppeteer.BrowserContext): Promise<puppeteer.Page>;
