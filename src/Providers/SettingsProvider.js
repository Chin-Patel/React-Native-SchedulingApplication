import * as firebase from 'firebase';
import React, { Component } from 'react';
import { findCategoryId, getIncreaseCategoryCount, getDecreaseCategoryCount } from '../Helper/CategoryUpdater'
import TaskProvider from '../TaskProvider';

export default class SettingsProvider extends React.Component {
    static settingsInstance;
    constructor(props) {
        super(props);
    }
    static getInstance() {
        if (SettingsProvider.settingsInstance == null) {
            SettingsProvider.settingsInstance = new SettingsProvider();
        }
        return this.settingsInstance;
    }

    updateTaskDelete(taskDelete, id){
        this.getReference(id).update({
            taskDelete: !taskDelete,
        });
    }

    updateCategoryDelete(categoryDelete, id){
        this.getReference(id).update({
            categoryDelete: !categoryDelete,
        });
    }

    

    getReference(id){
        return firebase.database().ref('userProfile/' + firebase.auth().currentUser.uid + '/settings/' + id);
    }
}









