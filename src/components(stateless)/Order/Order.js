import React from "react";
const order = (props) => {
  const ingredient = [];
  for (let ingName in props.ingredients) {
    ingredient.push(ingName);
  }

  const ing = ingredient.map((ig) => {
    return (
      <span>
        {ig} ({props.ingredients[ig]})
      </span>
    );
  });
  return (
    <div>
      <p>
        Your Total : <strong>INR {props.total}</strong>
      </p>
      {ing}
    </div>
  );
};
export default order;
