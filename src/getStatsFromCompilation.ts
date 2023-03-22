import { Compilation, Module } from 'webpack';
import { BundleStats, Chunk, ChunkGroup } from './types/BundleStats';

export function getStatsFromCompilation(compilation: Compilation): any {
    return {
        chunkGroups: getChunkGroups(compilation),
        namedChunkGroups: getNamedChunkGroups(compilation), // TOOD: Confirm that this is redundant
        chunks: getChunks(compilation),
        modules: getModules(compilation),
    };
}

function getChunkGroups(compilation: Compilation): ChunkGroup[] {
    return compilation.chunkGroups.map(cg => ({
        id: cg.id,
        name: cg.name || undefined,
        children: [...cg.childrenIterable].map(cg2 => cg2.id),
        chunks: cg.chunks.map(c => c.id!),
    }));
}

function getNamedChunkGroups(compilation: Compilation): ChunkGroup[] {
    return [...compilation.namedChunkGroups.values()].map(cg => ({
        id: cg.id,
        name: cg.name || undefined,
        children: [...cg.childrenIterable].map(cg2 => cg2.id),
        chunks: cg.chunks.map(c => c.id!),
    }));
}

function getChunks(compilation: Compilation): Chunk[] {
    return [...compilation.chunks].map(c => ({
        id: c.id || '<null>',
        name: c.name || undefined,
        files: [...c.files],
        modules: compilation.chunkGraph
            .getChunkModules(c)
            .map(m => m.readableIdentifier(compilation.requestShortener)),
    }));
}

function getModules(compilation: Compilation): any[] {
    return [...compilation.modules].map(m => getModule(m, compilation));
}

function getModule(m: Module, compilation: Compilation): any {
    return {
        moduleType: m.constructor.name,
        readableIdentifier: m.readableIdentifier(compilation.requestShortener),

        // TODO: Seems like this is not that interesting, since it can be derived from chunk data,
        // and it doesn't include chuncks where this module is in a concatenated module
        getModuleChunks: compilation.chunkGraph.getModuleChunks(m).map(c => c.id),
        modules: (m as any).modules?.map((m2: any) => getModule(m2, compilation)),
        size: m.size(),
    };
}
