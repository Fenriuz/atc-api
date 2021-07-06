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

  findAllUsers: `${prefix}could not get the users`,
  findOneUser: `${prefix}could not get the user`,
  createUser: `${prefix}the user could not be created`,
  updateUser: `${prefix}the user could not be updated`,
  userDisabled: `${prefix}user disabled`,

  incorrectUserOrPassword: `${prefix} user or password incorrect`,
  disabledUser: `${prefix}this user is disabled`,
  createToken: `${prefix}the token not be created`,
  verifyRefreshToken: `${prefix}the refresh token is invalid`,
  logout: `${prefix}logout failed`,

  findAllDeliveryMen: `${prefix}could not get the delivery men`,
  findOneDeliveryMan: `${prefix}could not get the delivery man`,
  createDeliveryMan: `${prefix}the delivery man could not be created`,
  updateDeliveryMan: `${prefix}the delivery man could not be updated`,

  findAllOrders: `${prefix}could not get the orders`,
  findOneOrder: `${prefix}could not get the order`,
  assignOrder: `${prefix} could not assign delivery man`,
  deliveredOrder: `${prefix} could not delivered order`,
  updateOrder: `${prefix} could not update the order`,
};
