import * as firebase from 'firebase';
import React, { Component } from 'react';
import { findCategoryId, getIncreaseCategoryCount, getDecreaseCategoryCount } from '../Helper/CategoryUpdater'
import TaskProvider from '../TaskProvider';

export default class CategoryProvider extends React.Component {
    static categoryInstance;
    constructor(props) {
        super(props);
        this.state = {
            TaskData: TaskProvider.getInstance(),
        }
    }
    static getInstance() {
        if (CategoryProvider.categoryInstance == null) {
            CategoryProvider.categoryInstance = new CategoryProvider();
        }
        return this.categoryInstance;
    }

    updateCategoryCount(catorgoriesList, categoryToUpdate, modifier) {
        let newCategoryCount;
        if (modifier == 'plus') {
            newCategoryCount = getIncreaseCategoryCount(catorgoriesList, categoryToUpdate)
        } else if (modifier = 'minus') {
            newCategoryCount = getDecreaseCategoryCount(catorgoriesList, categoryToUpdate)
        }
        let categoryId = findCategoryId(catorgoriesList, categoryToUpdate);
        //alert("=> " + newCategoryCount)
        this.getCategoryReference(categoryId).update({
            categoryCount: newCategoryCount
        });
    }

    createCategory(categoryName) {
        this.getReference().push({
            categoryName: categoryName,
            categoryCount: 0,
            categoryLetter: categoryName.substring(0, 1).toUpperCase()
        });
    }

    deleteCategory(category) {
        this.getCategoryReference(category.categoryKey).remove();
        this.deleteChildren(category.categoryName);
    }

    deleteChildren(category) {
        this.state.TaskData.getReference().on("value", tasksList => {
            let keySet = [];
            tasksList.forEach(snap => {
                if (snap.val().taskCategory == category) {
                    keySet.push(snap.key);
                }
            });
            for (let i = 0; i < keySet.length; i++) {
                this.state.TaskData.deleteTaskFromKey(keySet[i]);
            }
        });
    }


    getReference() {
        return firebase.database().ref('userProfile/' + firebase.auth().currentUser.uid + '/categoriesList/');
    }


    getCategoryReference(categoryId) {
        return firebase.database().ref('userProfile/' + firebase.auth().currentUser.uid + '/categoriesList/' + categoryId);
    }



}









