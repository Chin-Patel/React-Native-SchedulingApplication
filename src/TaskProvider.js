import * as firebase from 'firebase';
import React, { Component } from 'react';


export default class TaskProvider extends React.Component{
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
            taskDate: "" + taskDate,
            taskTitle: taskTitle,
            taskDescription: taskDescription,
            taskCategory: taskCategory
        });
    }

    getReference() {
        return firebase.database().ref('userProfile/' + firebase.auth().currentUser.uid + '/tasksList/');
    }
}









