/*
//angular imports
import { Injectable } from '@angular/core';

//nativescript imports
import * as fileSystemModule from 'file-system';

//3rd party imports
import * as faker from 'faker';
import * as _ from 'lodash';

//app imports
import * as constModule from '../shared/constants';
import { PtItem, PtUser, PtTask, PtComment } from '../shared/models/domain-models';
import { PriorityEnum, ItemTypeEnum, StatusEnum, GenderEnum } from '../shared/models/domain-enums';

@Injectable()
export class MockDataService {

    public generatePTItems(users: Array<PtUser>): Array<PtItem> {
        let items = _.times(constModule.NUM_PT_ITEMS, () => {
            return this.generatePTItem(users);
        });
        return items;
    }

    public generatePTItem(users: Array<PtUser>): PtItem {
        let date = faker.date.past(1);
        let title = this.toTitleCase(faker.company.bs());

        let typeStr = ItemTypeEnum[_.random(1, 4)];
        let type = ItemTypeEnum[typeStr];

        let priorityStr = PriorityEnum[_.random(1, 4)];
        let priority = PriorityEnum[priorityStr];

        let statusStr = StatusEnum[_.random(1, 4)];
        let status = StatusEnum[statusStr];

        let ptItem: PtItem = {
            id: faker.random.uuid(),
            title: title,
            dateCreated: date,
            dateModified: date,
            type: type,
            estimate: _.random(1, 24),
            priority: priority,
            status: status,
            assignee: _.sample(users),
            tasks: this.generateTasks(),
            comments: this.generateComments(users)
        };

        return ptItem;
    }

    public generateTasks(): Array<PtTask> {
        let numTasks = _.random(5, 20);
        let tasks = _.times(numTasks, () => {
            return this.generateTask();
        });
        return tasks;
    }

    public generateTask(): PtTask {
        let date = faker.date.past(1);
        let title = this.toTitleCase(faker.company.bs());
        let task: PtTask = {
            id: faker.random.uuid(),
            title: title,
            dateCreated: date,
            dateModified: date,
            completed: faker.random.boolean()
        };
        return task;
    }

    public generateUsers(): Array<PtUser> {
        let users = _.times(constModule.NUM_USERS, (idx: number) => {
            return this.generateUser(idx);
        });

        return users;
    }

    public getMeUser(): PtUser {
        let avatarMe = this.getUserAvatars('images/avatars/base64/me.txt')[0];
        let date = faker.date.past(1);
        let userMe: PtUser = {
            id: faker.random.uuid(),
            fullName: 'Alex Ziskind',
            avatar: avatarMe,
            gender: Gender.Male,
            dateCreated: date,
            dateModified: date
        };
        return userMe;
    }

    public generateUser(index: number): PtUser {
        let genderBool = faker.random.boolean();
        let firstName = faker.name.firstName(genderBool ? 1 : 0);
        let lastName = faker.name.lastName(genderBool ? 1 : 0);
        let date = faker.date.past(1);

        const avatar = `app/images/avatars/${genderBool ? 'males' : 'females'}/image-${index + 1}.png`;

        let user: PtUser = {
            id: faker.random.uuid(),
            fullName: firstName + ' ' + lastName,
            avatar: avatar,
            gender: genderBool ? Gender.Male : Gender.Female,
            dateCreated: date,
            dateModified: date
        };
        return user;
    }

    public generateComments(users: Array<PtUser>): Array<PtComment> {
        let numComments = _.random(0, 5);
        let comments = _.times(numComments, () => {
            return this.generateComment(users);
        });
        return comments;
    }

    public generateComment(users: Array<PtUser>): PtComment {
        let date = faker.date.past(1);
        let commentText = this.toTitleCase(faker.lorem.sentence(20, 40));
        //let commentText = this.toTitleCase(faker.company.bs());

        let comment: PtComment = {
            id: faker.random.uuid(),
            title: commentText,
            dateCreated: date,
            dateModified: date,
            user: _.sample(users)
        };
        return comment;
    }

    private getUserAvatars(path) {
        var avatarList: Array<string> = [];
        var currentAppFolder = fileSystemModule.knownFolders.currentApp();
        var menAvatarsFile = currentAppFolder.getFile(path);
        var fileText = menAvatarsFile.readTextSync();

        var lines = fileText.split('\n');
        for (var i = 0; i < lines.length; i++) {
            avatarList.push('data:image/png;base64,' + lines[i]);
        }
        return avatarList;
    }

    private getUserLiUserAvatars(path) {
        var avatarList: Array<string> = [];
        var currentAppFolder = fileSystemModule.knownFolders.currentApp();
        var menAvatarsFile = currentAppFolder.getFile(path);
        var fileText = menAvatarsFile.readTextSync();

        var lines = fileText.split('\n');
        for (var i = 0; i < lines.length; i++) {
            avatarList.push(lines[i]);
        }
        return avatarList;
    }
}
*/
