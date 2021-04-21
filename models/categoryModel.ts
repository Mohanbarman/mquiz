import fetch from 'node-fetch';

type CategoryType = {
    id: number;
    name: string;
}

type CategoryFindOptions = {
    id?: number,
    name?: string,
}

class CategoryModel {
    /**
     * Fetch all the categories from api
     * @param id ID of a category
     * @returns Array of CategoryType[] if @param id is not present.
     * @throws status code in case of error with the rest api
     */
    async find(filterBy?: CategoryFindOptions): Promise<CategoryType[] | CategoryType> {
        const endpoint = 'https://opentdb.com/api_category.php';
        const response = await fetch(endpoint);

        // return status code if any error occurs
        if (!response.ok) throw response.status;

        const responseJson = await response.json();

        // casting the response to CategoryType
        const categories: CategoryType[] = responseJson.trivia_categories.map((category: CategoryType) => category);

        if (filterBy && !filterBy.id && !filterBy.name) return categories;

        // filtering the category by id or name
        const category = categories.find((i) => {
            let idMatch = true, nameMatch = true;
            if (filterBy && filterBy.id) idMatch = i.id === filterBy.id;
            if (filterBy && filterBy.name) nameMatch = i.name === filterBy.name;
            return idMatch && nameMatch;
        });

        if (category) return category;

        // if there was not category with defined id or name
        return [];
    }
}

export default new CategoryModel();