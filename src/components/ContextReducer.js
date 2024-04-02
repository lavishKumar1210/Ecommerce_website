import React, { createContext, useContext, useReducer } from "react";
const CartStateContext = createContext();
const CartDispatchContext = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];
    case "REMOVE": // <-- Fix the action type here
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;

    case "UPDATE":
      return state.map((food) => {
        if (food.id === action.id) {
          return {
            ...food,
            qty: parseInt(action.qty) + food.qty,
            price: action.price + food.price,
          };
        }
        return food;
      });

    case "DROP":
      let empArray = [];
      return empArray;

    default:
      console.log("ERROR");
  }
};
export const CardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <>
      <CartStateContext.Provider value={state}>
        <CartDispatchContext.Provider value={dispatch}>
          {children}
        </CartDispatchContext.Provider>
      </CartStateContext.Provider>
    </>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
