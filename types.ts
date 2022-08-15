export enum Status {
    Right = "RIGHT",
    Wrong = "WRONG",
    Pending = "PENDING",
}

export interface IWords {
    word: string,
    status: Status
}