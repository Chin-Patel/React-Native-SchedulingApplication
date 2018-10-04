import * as firebase from 'firebase';
import React, { Component } from 'react';
import {findCategoryId, getIncreaseCategoryCount, getDecreaseCategoryCount} from '../Helper/CategoryUpdater'
import {getCompletetionTime} from '../Helper/DateHelper'
import TaskProvider from '../TaskProvider'
import CategoryProvider from './CategoryProvider'

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

    deleteCompletedTask(data){
        this.getCompletedTaskReference(data.id).remove();
    }


    updateCategoryCount(catorgoriesList, categoryToUpdate) {
        let newCategoryCount = getIncreaseCategoryCount(catorgoriesList, categoryToUpdate);
        let categoryId = findCategoryId(catorgoriesList, categoryToUpdate);
        this.state.CategoryData.getCategoryReference(categoryId).update({
            categoryCount: newCategoryCount
        });
    }

    getReference() {
        return firebase.database().ref('userProfile/' + firebase.auth().currentUser.uid + '/completedTasksList');
    }

    getCompletedTaskReference(id){
        return firebase.database().ref('userProfile/' + firebase.auth().currentUser.uid + '/completedTasksList/' + id);
    }
}









