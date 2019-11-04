import * as d from './declarations';
export declare function usePlugin(fileName: string): boolean;
export declare function getRenderOptions(opts: d.PluginOptions, sourceText: string, context: d.PluginCtx): Partial<d.RendererOptions>;
export declare function createResultsId(fileName: string): string;
