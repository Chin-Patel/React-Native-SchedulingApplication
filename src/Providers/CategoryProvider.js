import * as firebase from 'firebase';
import React from 'react';
import { findCategoryId, getIncreaseCategoryCount, getDecreaseCategoryCount } from '../Helper/CategoryUpdater'
import TaskProvider from './TaskProvider';
import {splitJSON } from '../Helper/Formatter'
import {sortArrayOfNames, sortCategoryNames} from '../Helper/Sorter'

/*
* This class is part of the datalayer and holds functionalities 
* to push categories to firebase as well as pull, update, and delete categories from firebase.
*/
export default class CategoryProvider extends React.Component {
    static categoryInstance;
    constructor(props) {
        super(props);
        this.state = {
            TaskData: TaskProvider.getInstance(),
        }
    }

    /*
    * Singleton to ensure theres only one instance of this provider
    */
    static getInstance() {
        if (CategoryProvider.categoryInstance == null) {
            CategoryProvider.categoryInstance = new CategoryProvider();
        }
        return this.categoryInstance;
    }

    /*
    * Updates the category count for the given category that needs to be updated
    */
    updateCategoryCount(catorgoriesList, categoryToUpdate, modifier) {
        let newCategoryCount;
        if (modifier == 'plus') {
            newCategoryCount = getIncreaseCategoryCount(catorgoriesList, categoryToUpdate)
        } else if (modifier = 'minus') {
            newCategoryCount = getDecreaseCategoryCount(catorgoriesList, categoryToUpdate)
        }
        let categoryId = findCategoryId(catorgoriesList, categoryToUpdate);
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

    /*
    * Deletes all the tasks within a category
    */
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

    pullCategories(self, split, disableLoader){
        this.getReference().on("value", categories => {
            this.categoriesList = [];
            categories.forEach(snap => {
              this.categoriesList.push({
                id: snap.key,
                categoryCount: snap.val().categoryCount,
                categoryLetter: snap.val().categoryLetter,
                categoryName: snap.val().categoryName,
              });
            });
            self.setState({ categoriesToRender: sortCategoryNames(this.categoriesList) })
            if(disableLoader){
                self.setState({ loading: false })
            }
            if(split) self.setState({ categorysToDisplay: sortArrayOfNames(splitJSON(this.categoriesList))})
          });
    }

    getReference() {
        return firebase.database().ref('userProfile/' + firebase.auth().currentUser.uid + '/categoriesList/');
    }

    getCategoryReference(categoryId) {
        return firebase.database().ref('userProfile/' + firebase.auth().currentUser.uid + '/categoriesList/' + categoryId);
    }
}









