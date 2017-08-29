import { PtItem, PtCurrentUser } from "./domain-models";

export interface ViewIndex {
    idx: number;
}

export interface State {
    backlogItems: PtItem[],
    currentUser: PtCurrentUser,
    selectedViewIndex: ViewIndex,
    [key: string]: any
}

export const INITIAL_STATE: State = {
    backlogItems: [],
    currentUser: undefined,
    selectedViewIndex: { idx: 1 }
};

export type StateKey = 'backlogItems' | 'currentUser' | 'selectedViewIndex';