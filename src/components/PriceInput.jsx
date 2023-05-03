import React from "react";

function PriceInput(props) {
  return (
    <td>
      <input id={"price-input"} type="text" onChange={props.handlePrice} value={props.price} />
      <select id="price-opt" onChange={props.handlePriceOption} value={props.priceOption}>
        <option value="total">total</option>
        <option value="per-unit" >per-unit</option>
      </select>
    </td>
  );
}

export default PriceInput;