export interface SwiftData {
    note: SwiftNote;
    mode: string;
}

export interface SwiftNote {
    id: string;
    title: string;
    content: string;
}