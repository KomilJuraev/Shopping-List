import React from "react";


function Add(props) {
  function addNewRow() {
    if ((props.item !== undefined && props.item !== "") && (props.quantity !== undefined && props.quantity !== "") && (props.unit !== "--") && (props.isEditClicked === false)) {
      props.setAddErrorMsgItemInput("");
      props.setAddErrorMsgQuantity("");
      props.setItemListRow([...props.itemListRow,
      <tr key={props.rowNumber} id={"row-" + props.rowNumber}>
        <td><input className={"item-checkbox"} id={"item-checkbox-" + props.rowNumber} type="radio" name="item-checkbox" onChange={handleChange} /></td>
        <td><p className={"item-name"} id={"item-name-" + props.rowNumber} type="text">{props.item}</p></td>
        <td>
          <p className="number-of-items" id={"number-of-items-" + props.rowNumber} type="text">{props.quantity}</p>
          <p className="unit" id={"unit-" + props.rowNumber}>{props.unit}</p>
        </td>
        <td>
          <p className="price-value" id={"price-input-" + props.rowNumber} type="text" placeholder="price">{"$ " + props.price}</p>
          <p className="priceOpt-value" id={"price-opt-" + props.rowNumber}>{props.priceOption}</p>
        </td>
        <td>
          <p className="TotalPrice" id={"total-price-" + props.rowNumber}>{"$ " + props.totalItemCost}</p>
        </td>
      </tr>
      ]);
      props.setItem("");
      props.setQuantity("");
      props.setUnit("--");
      props.setRowNumber(props.rowNumber + 1);
      props.setIsNewListButtonDisabled(false);
      // calculateTotalPrice(totalItemCost);
      props.setPrice("");
      props.setPriceOption("total");
    } else if ((props.item !== undefined && props.item !== "") && (props.quantity !== undefined && props.quantity !== "") && (props.unit !== "--") && (props.isEditClicked === true)) {
      props.setAddErrorMsgItemInput("");
      props.setAddErrorMsgQuantity("");
      var tempArr = [...props.itemListRow];
      tempArr[props.clickedRowId - 1] =
        <tr key={props.clickedRowId} id={"row-" + props.clickedRowId}>
          <td><input className={"item-checkbox"} id={"item-checkbox-" + props.clickedRowId} type="radio" name="item-checkbox" onChange={handleChange} /></td>
          <td><p className={"item-name"} id={"item-name-" + props.clickedRowId} type="text">{props.item}</p></td>
          <td>
            <p className="number-of-items" id={"number-of-items-" + props.clickedRowId} type="text">{props.quantity}</p>
            <p className="unit" id={"unit-" + props.clickedRowId}>{props.unit}</p>
          </td>
          <td>
            <p className="price-value" id={"price-input-" + props.clickedRowId} type="text" placeholder="price">{"$ " + props.price}</p>
            <p className="priceOpt-value" id={"price-opt-" + props.clickedRowId}>{props.priceOption}</p>
          </td>
          <td>
            <p className="TotalPrice" id={"total-price-" + props.clickedRowId}>{"$ " + props.totalItemCost}</p>
          </td>
        </tr>
      const checkbox = document.getElementById("item-checkbox-" + props.clickedRowId);
      checkbox.checked = false;
      props.setItemListRow(tempArr);
      props.setIsEditClicked(false);
      props.setCheckedId(false);
      props.setItem("");
      props.setQuantity("");
      props.setUnit("--");
      props.setClickedRowId();
      props.setPrice("");
      props.setPriceOption("total");
    } else {
      if (props.item === undefined || props.item === "") {
        props.setAddErrorMsgItemInput("Fill out the mandatory input fields");
      } else {
        props.setAddErrorMsgItemInput("");
      }

      if ((props.quantity === undefined || props.quantity === "") || (props.unit === "--")) {
        props.setAddErrorMsgQuantity("Fill out the mandatory input fields");
      } else {
        props.setAddErrorMsgQuantity("");
      }
    }
    props.setEditErrorMsg("");
  }

  function handleChange(event) {
    let tempId = event.target.parentNode.parentNode.id;
    tempId = tempId.substring(4);
    props.setClickedRowId(parseFloat(tempId));
    props.setCheckedId(true);
  }

  return (
    <button className="add-btn" onClick={addNewRow}>+</button>
  );
}

export default Add;