import React from "react";

function QuantityInput(props) {
  return (
    <td>
      <input className="number-of-items-input" type="text" onChange={props.handleQuantityChange} value={props.quantity} />
      <select name="unit-input" id="unit-input" onChange={props.handleUnit} value={props.unit}>
        <option value="default">--</option>
        <option value="lbs">lbs</option>
        <option value="pieces">pieces</option>
        <option value="liters">liters</option>
      </select>
      <div className="add-error-msg">{props.addErrorMsgQuantity}</div>
    </td>
  );
}

export default QuantityInput;