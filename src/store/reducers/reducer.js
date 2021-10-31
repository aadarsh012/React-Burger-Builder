import * as actionTypes from "../actions/action";

const initialState = {
  ingredients: {},
  total: 50,
  building: false
};

const INGREDIENT_PRICE = {
  salad: 5,
  cheese: 10,
  meat: 20,
  chicken: 15
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingName]: state.ingredients[action.ingName] + 1
        },
        total: state.total + INGREDIENT_PRICE[action.ingName],
        building: true
      };

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingName]: state.ingredients[action.ingName] - 1
        },
        total: state.total - INGREDIENT_PRICE[action.ingName],
        building: true
      };

    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        total: 50,
        building: false
      };
    default:
      return state;
  }
};

export default reducer;
