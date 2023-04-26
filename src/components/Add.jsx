import React from "react";

function addNewRow() {
  if ((item !== undefined && item !== "") && (quantity !== undefined && quantity !== "") && (unit !== "--") && (isEditClicked === false)) {
    setAddErrorMsgItemInput("");
    setAddErrorMsgQuantity("");
    setItemListRow([...itemListRow,
    <tr key={rowNumber} id={"row-" + rowNumber}>
      <td><input className={"item-checkbox"} id={"item-checkbox-" + rowNumber} type="radio" name="item-checkbox" onChange={handleChange} /></td>
      <td><p className={"item-name"} id={"item-name-" + rowNumber} type="text">{item}</p></td>
      <td>
        <p className="number-of-items" id={"number-of-items-" + rowNumber} type="text">{quantity}</p>
        <p className="unit" id={"unit-" + rowNumber}>{unit}</p>
      </td>
      <td>
        <p className="price-value" id={"price-input-" + rowNumber} type="text" placeholder="price">{"$ " + price}</p>
        <p className="priceOpt-value" id={"price-opt-" + rowNumber}>{priceOption}</p>
      </td>
      <td>
        <p className="TotalPrice" id={"total-price-" + rowNumber}>{"$ " + totalItemCost}</p>
      </td>
    </tr>
    ]);
    setItem("");
    setQuantity("");
    setUnit("--");
    setRowNumber(rowNumber + 1);
    setIsNewListButtonDisabled(false);
    // calculateTotalPrice(totalItemCost);
    setPrice("");
    setPriceOption("total");
  } else if ((item !== undefined && item !== "") && (quantity !== undefined && quantity !== "") && (unit !== "--") && (isEditClicked === true)) {
    setAddErrorMsgItemInput("");
    setAddErrorMsgQuantity("");
    var tempArr = [...itemListRow];
    tempArr[clickedRowId - 1] =
      <tr key={clickedRowId} id={"row-" + clickedRowId}>
        <td><input className={"item-checkbox"} id={"item-checkbox-" + clickedRowId} type="radio" name="item-checkbox" onChange={handleChange} /></td>
        <td><p className={"item-name"} id={"item-name-" + clickedRowId} type="text">{item}</p></td>
        <td>
          <p className="number-of-items" id={"number-of-items-" + clickedRowId} type="text">{quantity}</p>
          <p className="unit" id={"unit-" + clickedRowId}>{unit}</p>
        </td>
        <td>
          <p className="price-value" id={"price-input-" + clickedRowId} type="text" placeholder="price">{"$ " + price}</p>
          <p className="priceOpt-value" id={"price-opt-" + clickedRowId}>{priceOption}</p>
        </td>
        <td>
          <p className="TotalPrice" id={"total-price-" + clickedRowId}>{"$ " + totalItemCost}</p>
        </td>
      </tr>
    const checkbox = document.getElementById("item-checkbox-" + clickedRowId);
    checkbox.checked = false;
    setItemListRow(tempArr);
    setIsEditClicked(false);
    setCheckedId(false);
    setItem("");
    setQuantity("");
    setUnit("--");
    setClickedRowId();
    setPrice("");
    setPriceOption("total");
  } else {
    if (item === undefined || item === "") {
      setAddErrorMsgItemInput("Fill out the mandatory input fields");
    } else {
      setAddErrorMsgItemInput("");
    }

    if ((quantity === undefined || quantity === "") || (unit === "--")) {
      setAddErrorMsgQuantity("Fill out the mandatory input fields");
    } else {
      setAddErrorMsgQuantity("");
    }
  }
  setEditErrorMsg("");
}

function Add() {
  return (
    <button className="add-btn" onClick={addNewRow}>+</button>
  );
}

export default Add;