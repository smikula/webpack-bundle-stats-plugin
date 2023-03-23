import { Compilation, Module as RawModule } from 'webpack';
import { BundleStats, Chunk, ChunkGroup, Module } from './types/BundleStats';

export function getStatsFromCompilation(compilation: Compilation): BundleStats {
    return {
        chunkGroups: getChunkGroups(compilation),
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

function getModules(compilation: Compilation): Module[] {
    return [...compilation.modules].map(m => getModule(m, compilation));
}

function getModule(m: RawModule, compilation: Compilation): Module {
    return {
        moduleType: m.constructor.name,
        readableIdentifier: m.readableIdentifier(compilation.requestShortener),
        modules: (m as any).modules?.map((m2: RawModule) => getModule(m2, compilation)),
        size: m.size(),
    };
}
