import { Compilation, Module as RawModule } from 'webpack';
import { Asset, BundleStats, Chunk, ChunkGroup, Module, OriginModule } from './types/BundleStats';

export function getStatsFromCompilation(compilation: Compilation): BundleStats {
    const { version } = require('../package.json');

    return {
        webpackBundleStatsPluginVersion: version,
        assets: getAssets(compilation),
        chunkGroups: getChunkGroups(compilation),
        chunks: getChunks(compilation),
    };
}

function getAssets(compilation: Compilation): Record<string, Asset> {
    const assets: Record<string, Asset> = {};
    for (let assetName of compilation.assetsInfo.keys()) {
        assets[assetName] = { size: compilation.assetsInfo.get(assetName)!.size! };
    }

    return assets;
}

function getChunkGroups(compilation: Compilation): ChunkGroup[] {
    return compilation.chunkGroups.map(cg => ({
        chunkGroupType: cg.constructor.name,
        id: cg.id,
        name: cg.name || undefined,
        children: [...cg.childrenIterable].map(cg2 => cg2.id),
        chunks: cg.chunks.map(c => c.id!),
        origins: cg.origins.map(origin => ({
            request: origin.request,
            module: getOriginModule(origin.module, compilation),
        })),
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

function getOriginModule(m: RawModule, compilation: Compilation): OriginModule | undefined {
    if (m) {
        return {
            readableIdentifier: m.readableIdentifier(compilation.requestShortener),
        };
    } else {
        return undefined;
    }
}
