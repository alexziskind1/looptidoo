import { PtItem, PtUser } from "./domain-models";

export interface ViewIndex {
    idx: number;
}

export interface State {
    backlogItems: PtItem[],
    users: PtUser[],
    currentUser: PtUser,
    selectedViewIndex: ViewIndex,
    [key: string]: any
}

export const INITIAL_STATE: State = {
    backlogItems: [],
    users: [],
    currentUser: undefined,
    selectedViewIndex: { idx: 1 }
};

export type StateKey = 'users' | 'backlogItems' | 'currentUser' | 'selectedViewIndex';