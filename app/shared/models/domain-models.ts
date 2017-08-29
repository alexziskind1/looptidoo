import * as enums from './domain-enums';

export interface PtLoginModel {
    username: string;
    password: string;
}

export interface PtObjectBase {
    id: string;
    title?: string;
    dateCreated: Date;
    dateModified: Date;
    dateDeleted?: Date;
}

export enum Gender {
    Male = "Male",
    Female = "Female",
    Unspecified = "Unspecified",
}

export interface PtUser extends PtObjectBase {
    fullName: string;
    avatar: string;
    gender: Gender;
}

export interface PtCurrentUser extends PtUser {
    isAuthenticated: boolean;
}

export interface PtItem extends PtObjectBase {
    description?: string;
    type: enums.ItemTypeEnum;
    estimate: number;
    priority: enums.PriorityEnum;
    status: enums.StatusEnum;
    assignee: PtUser;
    tasks: Array<PtTask>;
    comments: Array<PtComment>;
}

export interface PtTask extends PtObjectBase {
    completed: boolean;
}

export interface PtComment extends PtObjectBase {
    user: PtUser;
}

export interface PtNewTask {
    title: string;
    completed: boolean;
}

export interface PtNewComment {
    title: string;
    userId: string;
}

export interface PtNewItem {
    title: string;
    description?: string;
    type: enums.ItemTypeEnum;
}

