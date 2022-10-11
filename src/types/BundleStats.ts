export interface BundleStats {
    chunkGroups: ChunkGroup[];
    chunks: Chunk[];
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

type ChunkId = string | number;
