import React from "react";

function ItemInput(props) {
  return (
    <td>
      <input className="item-name-input" type="text" onChange={props.handleItemChange} value={props.item} />
      <div className="add-error-msg">{props.addErrorMsgItemInput}</div>
    </td>
  );
}

export default ItemInput;