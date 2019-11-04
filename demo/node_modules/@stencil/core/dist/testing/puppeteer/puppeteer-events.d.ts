import * as d from '../../declarations';
import * as pd from './puppeteer-declarations';
import * as puppeteer from 'puppeteer';
export declare function initPageEvents(page: pd.E2EPageInternal): Promise<void>;
export declare function waitForEvent(page: pd.E2EPageInternal, eventName: string, elementHandle: puppeteer.ElementHandle): Promise<any>;
export declare class EventSpy implements d.EventSpy {
    eventName: string;
    events: d.SerializedEvent[];
    private cursor;
    private queuedHandler;
    constructor(eventName: string);
    readonly length: number;
    readonly firstEvent: d.SerializedEvent;
    readonly lastEvent: d.SerializedEvent;
    next(): Promise<{
        done: boolean;
        value: d.SerializedEvent;
    }>;
    push(ev: d.SerializedEvent): void;
}
export declare function addE2EListener(page: pd.E2EPageInternal, elmHandle: puppeteer.JSHandle, eventName: string, callback: (ev: any) => void): Promise<void>;
