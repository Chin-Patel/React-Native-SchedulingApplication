import * as firebase from 'firebase';
import React from 'react';

/*
* This class is part of the datalayer and holds functionalities regarding
* the application settings stored in firebase.
*/
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

    updateTaskDelete(taskDelete, id) {
        this.getSettingsReference(id).update({
            taskDelete: !taskDelete,
        });
    }

    updateCategoryDelete(categoryDelete, id) {
        this.getSettingsReference(id).update({
            categoryDelete: !categoryDelete,
        });
    }

    pullSettings(self) {
        this.getReference().on("value", tasksList => {
            tasksList.forEach(snap => {
                self.state.taskDelete = snap.val().taskDelete;
                self.state.categoryDelete = snap.val().categoryDelete;
            });
        });
    }

    pullSettingsWithID(self){
        this.getReference().on("value", tasksList => {
            tasksList.forEach(snap => {
                self.state.id = snap.key;
                self.state.taskDelete = snap.val().taskDelete;
                self.state.categoryDelete = snap.val().categoryDelete;
                self.setState({ loading: false })
            });
        });
    }

    getReference() {
        return firebase.database().ref('userProfile/' + firebase.auth().currentUser.uid + '/settings/');
    }

    getSettingsReference(id) {
        return firebase.database().ref('userProfile/' + firebase.auth().currentUser.uid + '/settings/' + id);
    }
}









