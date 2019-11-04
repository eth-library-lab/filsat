import * as d from '../../declarations';
export declare const formatLazyBundleRuntimeMeta: (bundleId: any, cmps: d.ComponentCompilerMeta[]) => [any, [number, string, {
    [memberName: string]: [number, string?];
}?, [number, string, string][]?][]];
export declare const formatComponentRuntimeMeta: (compilerMeta: d.ComponentCompilerMeta, includeMethods: boolean) => [number, string, {
    [memberName: string]: [number, string?];
}?, [number, string, string][]?];
export declare const stringifyRuntimeData: (data: any) => string;
