type CategoryType = {
    id: number;
    name: string;
}

/**
 * Fetch all the categories from api
 * @returns Array of CategoryType(s) in case of error returns status code.
 */
export default async function fetchCategories(): Promise<CategoryType[] | number> {
    const endpoint = 'https://opentdb.com/api_category.php';
    const response = await fetch(endpoint);

    // return status code if any error occurs
    if (!response.ok) return response.status;

    const responseJson = await response.json();

    // defining the type of response
    const categories: CategoryType[] = responseJson.trivia_categories.map((category: CategoryType) => category);

    return categories;
}