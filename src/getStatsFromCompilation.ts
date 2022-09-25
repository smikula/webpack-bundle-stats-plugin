import { Compilation } from 'webpack';
import { BetterStats } from './types/BetterStats';

export function getStatsFromCompilation(compilation: Compilation): BetterStats {
    return {
        chunkGroups: compilation.chunkGroups.map(cg => ({ id: cg.id })),
        chunks: [...compilation.chunks].map(c => ({ id: c.id || '<null>' })),
    };
}
