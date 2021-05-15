import { Injectable } from '@angular/core';

import { Category } from './classes/Category';

@Injectable({
    providedIn: 'root'
})

export class AppService {

    constructor () {}

    getCategories() {
        const categories: Category[] = [];
        for (let index = 1; index < 4; index++) {
            const category = new Category(index, "Categoria " + index)
            categories.push(category);
        }
        return categories;
    }

}