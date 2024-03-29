export interface BundleStats {
    webpackBundleStatsPluginVersion: string;
    assets: Record<string, Asset>;
    chunkGroups: ChunkGroup[];
    chunks: Chunk[];
}

export interface Asset {
    size: number;
}

export interface ChunkGroup {
    chunkGroupType: string;
    id: string;
    name?: string;
    children: string[];
    chunks: ChunkId[];
    origins: Origin[];
}

export interface Chunk {
    id: ChunkId;
    name?: string;
    files: string[];
    modules: Module[];
}

export type ChunkId = string | number;

export interface Module {
    moduleType: string;
    readableIdentifier: string;
    modules?: Module[];
    size: number;
}

export interface Origin {
    request: string;
    module?: OriginModule;
}

export interface OriginModule {
    readableIdentifier: string;
}
