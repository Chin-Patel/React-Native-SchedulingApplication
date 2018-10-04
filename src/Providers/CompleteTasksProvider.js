import * as firebase from 'firebase';
import React, { Component } from 'react';
import {findCategoryId, getIncreaseCategoryCount} from '../Helper/CategoryUpdater'
import {getCompletetionTime} from '../Helper/DateHelper'

export default class CompleteTasksProvider extends React.Component {
    static completeTaskInstance;
    constructor(props) {
        super(props);
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
    


    updateCategoryCount(catorgoriesList, categoryToUpdate) {
        let newCategoryCount = getIncreaseCategoryCount(catorgoriesList, categoryToUpdate);
        let categoryId = findCategoryId(catorgoriesList, categoryToUpdate);
        this.getReference(categoryId).update({
            categoryCount: newCategoryCount
        });
    }

    getReference() {
        return firebase.database().ref('userProfile/' + firebase.auth().currentUser.uid + '/completedTasksList');
    }
}









