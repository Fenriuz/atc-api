const prefix = 'ATC error: ';

export const httpErrors = {
  findAllRestaurants: `${prefix}could not get the restaurants.`,
  findOneRestaurant: `${prefix}could not get the restaurant`,
  createRestaurant: `${prefix}the restaurant could not be created`,
  updateRestaurant: `${prefix}the restaurant could not be updated`,

  findAllMeals: `${prefix}could not get the meals`,
  findOneMeal: `${prefix}could not get the meal`,
  createMeal: `${prefix}the meal could not be created`,
  updateMeal: `${prefix}the meal could not be updated`,

  findAllSections: `${prefix}could not get the sections`,
  findOneSection: `${prefix}could not get the section`,
  createSection: `${prefix}the section could not be created`,
  updateSection: `${prefix}the section could not be updated`,

  findAllCategories: `${prefix}could not get the categories`,
  findOneCategory: `${prefix}could not get the category`,
  createCategory: `${prefix}the category could not be created`,
  updateCategory: `${prefix}the category could not be updated`,
};
