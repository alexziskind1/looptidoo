export enum ItemTypeEnum {
    PBI = 1,
    Bug = 2,
    Chore = 3,
    Impediment = 4
}
export namespace ItemTypeEnum {
    export function getImage(type: ItemTypeEnum): string {
        switch (type) {
            case ItemTypeEnum.PBI:
                return 'pbi.png';
            case ItemTypeEnum.Bug:
                return 'bug.png';
            case ItemTypeEnum.Chore:
                return 'chore.png';
            case ItemTypeEnum.Impediment:
                return 'impediment.png';
            default:
                return '';
        }
    }
}

export enum PriorityEnum {
    Critical = 1,
    High = 2,
    Medium = 3,
    Low = 4
}
export namespace PriorityEnum {
    export function getColor(type: PriorityEnum): string {
        switch (type) {
            case PriorityEnum.Critical:
                return 'red';
            case PriorityEnum.High:
                return 'yellow';
            case PriorityEnum.Medium:
                return 'blue';
            case PriorityEnum.Low:
                return 'green';
            default:
                return 'gray';
        }
    }
}

export enum StatusEnum {
    Submitted = 1,
    Open = 2,
    Closed = 3,
    ReOpened = 4
}



/*
export const estimateValues: Array<PTDomain.IEstimate> = [
    { name: '1 point', color: '' },
    { name: '2 points', color: '' },
    { name: '3 points', color: '' },
    { name: '4 points', color: '' }
];
*/

/*
export const itemTypeValues: Array<PTDomain.IItemType> = [
    { name: 'PBI', image: '', value: PTDomain.ItemTypeEnum.PBI },
    { name: 'Bug', image: '', value: PTDomain.ItemTypeEnum.Bug },
    { name: 'Chore', image: '', value: PTDomain.ItemTypeEnum.Chore },
    { name: 'Impediment', image: '', value: PTDomain.ItemTypeEnum.Impediment }
];

export const priorityValues: Array<PTDomain.IPriority> = [
    { name: 'Critical', color: 'red' },
    { name: 'High', color: 'yellow' },
    { name: 'Medium', color: 'blue' },
    { name: 'Low', color: 'green' }
];

export const statusValues: Array<PTDomain.IStatus> = [
    { name: 'Submitted' },
    { name: 'Open' },
    { name: 'Closed' },
    { name: 'Re-opened' }
];
*/