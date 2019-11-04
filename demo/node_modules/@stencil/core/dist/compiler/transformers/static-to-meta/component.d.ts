import * as d from '../../../declarations';
import ts from 'typescript';
export declare const parseStaticComponentMeta: (config: d.Config, compilerCtx: d.CompilerCtx, typeChecker: ts.TypeChecker, cmpNode: ts.ClassDeclaration, moduleFile: d.Module, nodeMap: WeakMap<any, d.ComponentCompilerMeta>, transformOpts: d.TransformOptions, fileCmpNodes: ts.ClassDeclaration[]) => ts.ClassDeclaration;
