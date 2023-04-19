import { Compilation, Module as RawModule } from 'webpack';
import { BundleStats, Chunk, ChunkGroup, Module } from './types/BundleStats';

export function getStatsFromCompilation(compilation: Compilation): BundleStats {
    const { version } = require('../package.json');

    return {
        webpackBundleStatsPluginVersion: version,
        chunkGroups: getChunkGroups(compilation),
        chunks: getChunks(compilation),
    };
}

function getChunkGroups(compilation: Compilation): ChunkGroup[] {
    return compilation.chunkGroups.map(cg => ({
        chunkGroupType: cg.constructor.name,
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
        modules: compilation.chunkGraph.getChunkModules(c).map(m => getModule(m, compilation)),
    }));
}

function getModule(m: RawModule, compilation: Compilation): Module {
    return {
        moduleType: m.constructor.name,
        readableIdentifier: m.readableIdentifier(compilation.requestShortener),
        modules: (m as any).modules?.map((m2: RawModule) => getModule(m2, compilation)),
        size: m.size(),
    };
}
