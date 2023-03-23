export interface BundleStats {
    chunkGroups: ChunkGroup[];
    chunks: Chunk[];
    modules: Module[];
}

export interface ChunkGroup {
    id: string;
    name?: string;
    children: string[];
    chunks: ChunkId[];
}

export interface Chunk {
    id: ChunkId;
    name?: string;
}

export type ChunkId = string | number;

export interface Module {
    moduleType: string;
    readableIdentifier: string;
    modules?: Module[];
    size: number;
}
