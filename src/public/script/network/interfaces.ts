export interface Remote extends EventEmitter {
    identifier: string;
    emitTo(id: string, title: string, body: any): void;
    emitAll(title: string, body: any): void;
}
