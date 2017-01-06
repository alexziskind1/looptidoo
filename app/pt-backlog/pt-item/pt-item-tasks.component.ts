//angular imports
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params, UrlSegment } from '@angular/router';

//nativescript imports
import { RouterExtensions } from 'nativescript-angular/router';
import { TextView } from 'ui/text-view';
import { ScrollView } from 'ui/scroll-view';

//3rd party imports
import 'rxjs/add/operator/switchMap';

//app imports
import { slideInDownAnimation, slideInAnimations } from '../../shared/animations';
import { BacklogService, AuthenticationService } from '../../services';
import { PTDomain } from '../../typings/domain';
import IPTItem = PTDomain.IPTItem;
import ITask = PTDomain.ITask;
import INewTask = PTDomain.INewTask;


@Component({
    moduleId: module.id,
    selector: 'pt-item-tasks',
    templateUrl: 'pt-item-tasks.component.html',
    animations: slideInAnimations
})
export class PTItemTasksComponent implements OnInit {
    private selectedViewIndex = 0;
    public item: IPTItem;
    public newTaskTitle: string = '';

    public get tasks() {
        return this.item.tasks;
    }


    public get animationState() {
        return this.selectedViewIndex === 2 ? 'off' : 'on';
    }


    constructor(private route: ActivatedRoute,
        private router: Router,
        private routerExtensions: RouterExtensions,
        private backlogService: BacklogService) { }


    public ngOnInit() {
        //console.log('init item details: ' + this.route.parent.toString());

        this.route.parent.params
            .switchMap((params: Params) => this.backlogService.getItem(params['id']))
            .subscribe((item: IPTItem) => this.item = item);
    }



    public toggleTapped(task: ITask) {
        this.backlogService.toggleTask(this.item, task);
    }


    public addTapped(newTaskTV: TextView) {
        let newTitle = this.newTaskTitle.trim();
        if (newTitle.length === 0)
            return;
        let newTask: INewTask = {
            title: newTitle,
            completed: false
        };
        this.backlogService.addTask(this.item, newTask);
        this.newTaskTitle = '';
        newTaskTV.dismissSoftInput();
    }

    public mathCeil(num: number) {
        return Math.ceil(num);
    }

    public taskHeight(taskTitle: string) {
        if (taskTitle) {
            let lineHeight = 20;
            let numlines = Math.ceil(taskTitle.length / 25);
            return ((numlines < 2 ? 2 : numlines) * lineHeight) + 10;
        }
        else {
            return 40;
        }
    }

    public taskTitleChange(task: ITask, args: string) {
        //task.title=$event.value
        //console.log('taskTitleChange: ');
        //console.log('task title: ' + task.title);
        //console.dir('new string: ' + args);
        this.backlogService.updateTask(this.item, task, args);
    }
}
