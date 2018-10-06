import * as firebase from 'firebase';
import React from 'react';
import { getCompletetionTime } from '../Helper/DateHelper'
import TaskProvider from '../TaskProvider'
import CategoryProvider from './CategoryProvider'

/*
* This class is part of the datalayer and holds functionalities 
* to push completed tasks to firebase as well as pull, update, and delete completed tasks from firebase.
*/
export default class CompleteTasksProvider extends React.Component {
    static completeTaskInstance;
    constructor(props) {
        super(props);
        this.state = {
            CategoryData: CategoryProvider.getInstance(),
            TaskData: TaskProvider.getInstance(),
        }
    }
    static getInstance() {
        if (CompleteTasksProvider.completeTaskInstance == null) {
            CompleteTasksProvider.completeTaskInstance = new CompleteTasksProvider();
        }
        return this.completeTaskInstance;
    }

    completeTask(data) {
        this.getReference().push({
            taskTitle: data.taskTitle,
            taskDescription: data.taskDescription,
            taskDate: data.taskDate,
            taskCategory: data.taskCategory,
            taskCompletionTime: getCompletetionTime()
        });
    }

    pullCompletedTasks(self) {
        this.getReference().on("value", tasksList => {
            this.items = [];
            tasksList.forEach(snap => {
                this.items.push({
                    id: snap.key,
                    taskTitle: snap.val().taskTitle,
                    taskDescription: snap.val().taskDescription,
                    taskDate: snap.val().taskDate,
                    taskCategory: snap.val().taskCategory,
                    taskCompletionTime: snap.val().taskCompletionTime,
                });
            });
            self.setState({ listViewData: this.items })
            self.setState({ loading: false })
        });
    }

    deleteCompletedTask(data) {
        this.getCompletedTaskReference(data.id).remove();
    }

    updateCategoryCount(catorgoriesList, categoryToUpdate) {
        this.state.CategoryData.updateCategoryCount(catorgoriesList, categoryToUpdate, 'plus');
    }

    getReference() {
        return firebase.database().ref('userProfile/' + firebase.auth().currentUser.uid + '/completedTasksList');
    }

    getCompletedTaskReference(id) {
        return firebase.database().ref('userProfile/' + firebase.auth().currentUser.uid + '/completedTasksList/' + id);
    }
}









