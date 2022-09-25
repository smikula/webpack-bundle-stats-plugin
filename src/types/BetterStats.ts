export interface BetterStats {
    chunkGroups: ChunkGroup[];
    chunks: Chunk[];
}

export interface ChunkGroup {
    id: string;
}

export interface Chunk {
    id: ChunkId;
}

type ChunkId = string | number;
