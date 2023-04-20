type Urls = string;
const baseUrl: Urls = "https://www.themealdb.com/api/json/v1/1";

export interface TMeal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate?: any;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strIngredient16?: string;
  strIngredient17?: string;
  strIngredient18?: string;
  strIngredient19?: string;
  strIngredient20?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strMeasure16?: string;
  strMeasure17?: string;
  strMeasure18?: string;
  strMeasure19?: string;
  strMeasure20?: string;
  strSource?: string;
  strImageSource?: any;
  strCreativeCommonsConfirmed?: any;
  dateModified?: any;
}

export async function getRandomMeals() {
  const url: Urls = `${baseUrl}/random.php`;
  try {
    const response = await fetch(url);
    const data: TMeal[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export interface TCategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export async function getCategories() {
  const url: Urls = `${baseUrl}/categories.php`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.categories as TCategory[];
  } catch (error) {
    console.error(error);
  }
}

export async function filterByCategory(category: string) {
  try {
    const url: Urls = `${baseUrl}/filter.php?c=${category}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.meals as TMeal[];
  } catch (error) {
    console.error(error);
  }
}
