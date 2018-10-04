import * as firebase from 'firebase';
import React, { Component } from 'react';
import {findCategoryId, getIncreaseCategoryCount, getDecreaseCategoryCount} from '../Helper/CategoryUpdater'


export default class CategoryProvider extends React.Component {
    static categoryInstance;
    constructor(props) {
        super(props);
    }
    static getInstance() {
        if (CategoryProvider.categoryInstance == null) {
            CategoryProvider.categoryInstance = new CategoryProvider();
        }
        return this.categoryInstance;
    }

    updateCategoryCount(catorgoriesList, categoryToUpdate, modifier) {
        let newCategoryCount;
        if(modifier == 'plus'){
            newCategoryCount = getIncreaseCategoryCount(catorgoriesList, categoryToUpdate)
        }else if(modifier = 'minus'){
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

    deleteCategory(id){
        this.getCategoryReference(id).remove();
    }


    getReference(){
        return firebase.database().ref('userProfile/' + firebase.auth().currentUser.uid + '/categoriesList/');
    }


    getCategoryReference(categoryId) {
        return firebase.database().ref('userProfile/' + firebase.auth().currentUser.uid + '/categoriesList/' + categoryId);
    }



}









