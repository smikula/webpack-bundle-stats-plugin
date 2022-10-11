import { Compilation } from 'webpack';
import { BundleStats, Chunk, ChunkGroup } from './types/BundleStats';

export function getStatsFromCompilation(compilation: Compilation): BundleStats {
    return {
        chunkGroups: getChunkGroups(compilation),
        chunks: getChunks(compilation),
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
    }));
}
