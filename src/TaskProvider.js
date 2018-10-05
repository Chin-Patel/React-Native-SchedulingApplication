import * as firebase from 'firebase';
import React, { Component } from 'react';
import { formatTitle, formatDescription, formatCategory, formatDate } from './Helper/Formatter'


export default class TaskProvider extends React.Component {
    static providerInstance;
    constructor(props) {
        super(props);
    }
    static getInstance() {
        if (TaskProvider.providerInstance == null) {
            TaskProvider.providerInstance = new TaskProvider();
        }
        return this.providerInstance;
    }

    createTask(taskTitle, taskDescription, taskDate, taskCategory) {
        this.getReference().push({
            taskDate: formatDate(taskDate),
            taskTitle: formatTitle(taskTitle),
            taskDescription: formatDescription(taskDescription),
            taskCategory: formatCategory(taskCategory)
        });
    }

    updateTask(taskTitle, taskDescription, taskDate, taskCategory, data){
        this.getTaskReference(data.id).update({
            taskTitle : taskTitle,
            taskDescription : taskDescription,
            taskDate : taskDate,
            taskCategory : taskCategory
        });
    }




    // updateOldCategory(taskCategory) {
    //     //update old category
    //     let newCategoryCount = this.helper.getCategoryCount(this.categoriesList, taskCategory);
    //     newCategoryCount--;
    //     let categoryId = this.helper.findCategoryId(this.categoriesList, taskCategory);
    //     this.categoriesProvider.updateCategoryCount(categoryId, newCategoryCount, taskCategory);
    //   }
    
    //   updateNewCategory(taskCategory) {
    //     //update new category
    //     let newCategoryCount = this.helper.getIncreaseCategoryCount(this.categoriesList, taskCategory);
    //     let categoryId = this.helper.findCategoryId(this.categoriesList, taskCategory);
    //     this.categoriesProvider.updateCategoryCount(categoryId, newCategoryCount, taskCategory);
    //   }

    getKeySet(category) {
        this.getReference().on("value", tasksList => {
            let keySet = [];
            tasksList.forEach(snap => {
                if (snap.val().taskCategory == category) {
                    keySet.push(snap.key);
                }
            });
            return keySet;
        });
    }

    deleteTask(data) {
        this.getTaskReference(data.id).remove();
    }

    deleteTaskFromKey(id){
        this.getTaskReference(id).remove();
    }

    getReference() {
        return firebase.database().ref('userProfile/' + firebase.auth().currentUser.uid + '/tasksList/');
    }

    getTaskReference(id) {
        return firebase.database().ref('userProfile/' + firebase.auth().currentUser.uid + '/tasksList/' + id);
    }
}









