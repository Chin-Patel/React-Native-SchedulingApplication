

export function sortCategoryNames(arr) {
    return arr.sort(function (a, b) {
        if (a.categoryName > b.categoryName)
          return 1;
        if (a.categoryName < b.categoryName)
          return -1;
        return 0;
    });
}

export function sortArrayOfNames(arr){
    return arr.sort();
}

