import React, { useEffect, useState, useRef } from "react";

function App() {
  const [rowNumber, setRowNumber] = useState(1);
  const [itemListRow, setItemListRow] = useState([]);
  const [addErrorMsgItemInput, setAddErrorMsgItemInput] = useState("");
  const [addErrorMsgQuantity, setAddErrorMsgQuantity] = useState("");
  const [editErrorMsg, setEditErrorMsg] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("--");
  const [checkedId, setCheckedId] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [clickedRowId, setClickedRowId] = useState();
  const clickedRowIdRef = useRef(1);
  const [totalPrice, setTotalPrice] = useState([]);
  const [multipleList, setMultipleList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isNewListButtonDisabled, setIsNewListButtonDisabled] = useState(true);
  const [isPreviousButtonDisabled, setIsPreviousButtonDisabled] = useState(true);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [isPageRemoved, setIsPageRemoved] = useState(false);
  const [price, setPrice] = useState("")
  const [priceOption, setPriceOption] = useState("total")
  const [totalItemCost, setTotalItemCost] = useState(0);

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

  useEffect(() => {
    calculateTotalPrice();
    if (itemListRow.length === 0) {
      setIsNewListButtonDisabled(true);
    }
  }, [itemListRow]);

  function handleItemChange(event) {
    if (event !== false) {
      setItem(event.target.value);
    } else {
      if (event !== false) {
        setItem(event.target.value);
      } else {
        const itemNameInput = document.getElementById(`item-name-` + clickedRowId);
        const itemName = itemNameInput.innerText;
        setItem(itemName);
      }
    }
  }

  function handleQuantityChange(event) {
    if (event !== false) {
      setQuantity(event.target.value);
    } else {
      if (event !== false) {
        setQuantity(event.target.value);
      } else {
        const itemNameInput = document.getElementById(`number-of-items-` + clickedRowId);
        const itemName = itemNameInput.innerText;
        setQuantity(itemName);
      }
    }
  }

  function handleUnit(event) {
    if (event !== false) {
      setUnit(event.target.value);
    } else {
      if (event !== false) {
        setUnit(event.target.value);
      } else {
        const unitInput = document.getElementById(`unit-` + clickedRowId);
        const currentUnit = unitInput.innerText;
        setUnit(currentUnit);
      }
    }
  }

  function handlePrice(event) {
    if (event !== false) {
      if (event.target.value === "") {

      } else {
        setPrice(event.target.value);
      }
      totalItemPrice(event.target.value, priceOption);
    } else {
      const clickedPrice = document.getElementById(`price-input-` + clickedRowId).innerText;
      const clickedPriceVal = clickedPrice.replace("$ ", "");
      setPrice(clickedPriceVal);
    }
  }

  useEffect(() => {
    console.log("Price =======> " + price);
  }, [price]);

  function handlePriceOption(event) {
    if (event !== false) {
      setPriceOption(event.target.value);
      totalItemPrice(price.replace("$ ", ""), event.target.value);
    } else {
      const clickedPriceOpt = document.getElementById(`price-opt-` + clickedRowId).innerText;
      setPriceOption(clickedPriceOpt);
    }
  }

  useEffect(() => {
    console.log("Price =======> " + priceOption);
  }, [priceOption]);

  function totalItemPrice(itemPrice, priceType) {
    let totalPrice;
    if (itemPrice === "") {
      totalPrice = 0;
    } else if (priceType === "total") {
      totalPrice = parseFloat(itemPrice);
    }
    else {
      totalPrice = parseFloat(itemPrice) * quantity;
    }
    setTotalItemCost(totalPrice);
  }

  useEffect(() => {
    console.log("Price =======> " + totalItemCost);
  }, [totalItemCost]);

  function calculateTotalPrice() {
    let curntTotalPrice = 0;
    const totalPrices = document.querySelectorAll('.TotalPrice');
    totalPrices.forEach(price => {
      let eachPrice = price.textContent.replace("$ ", "")
      curntTotalPrice += parseFloat(eachPrice);
    });
    setTotalPrice(curntTotalPrice);
  }

  useEffect(() => {
    console.log("Price =======> " + totalPrice);
  }, [totalPrice]);

  function handleChange(event) {
    let tempId = event.target.parentNode.parentNode.id;
    tempId = tempId.substring(4);
    setClickedRowId(parseFloat(tempId));
    setCheckedId(true);
  }

  useEffect(() => {
    console.log("current " + clickedRowId)
    if (clickedRowId !== "" && clickedRowId !== undefined) {
      clickedRowIdRef.current = clickedRowId;
    } else {
      clickedRowIdRef.current = 1;
    }
  }, [clickedRowId]);

  function handleEdit() {
    if (checkedId === true) {
      setIsEditClicked(true);
      handleItemChange(false);
      handleQuantityChange(false);
      handleUnit(false);
      setEditErrorMsg("");
      handlePrice(false);
      handlePriceOption(false);
    } else {
      setEditErrorMsg("Item is not selected. Please select a radio button to edit.")
    }
    setAddErrorMsgItemInput("");
    setAddErrorMsgQuantity("");
  }

  const removeEmptyIndex = (index, array) => {
    const updatedList = array.filter((item, i) => i !== index);
    return updatedList;
  };

  function removePage() {
    setItemListRow([]);
    setIsPageRemoved(true);
  }

  function handleClear() {
    if (checkedId === true) {
      let tempItemList = [...itemListRow];
      if (tempItemList.length > 1) {
        tempItemList.splice(clickedRowId - 1, 1);
        setItemListRow(tempItemList);
      } else {
        removePage();
      }
      const checkbox = document.getElementById("item-checkbox-" + clickedRowId);
      checkbox.checked = false;
      setEditErrorMsg("");
    } else {
      setEditErrorMsg("Item is not selected. Please select a radio button to remove.");
    }
    setAddErrorMsgItemInput("");
    setAddErrorMsgQuantity("");
    setCheckedId(false);
    setClickedRowId();
  }

  useEffect(() => {
    console.log("isPageRemoved ==> " + isPageRemoved);
  }, [isPageRemoved]);

  function handleClearAll() {
    removePage();
    setEditErrorMsg("");
    setAddErrorMsgItemInput("");
    setAddErrorMsgQuantity("");
    setTotalPrice(0);
    setCheckedId(false);
    setClickedRowId();
  }

  function handleNewList() {
    setEditErrorMsg("");
    setAddErrorMsgItemInput("");
    setAddErrorMsgQuantity("");
    let currentPgeNum;
    let updatedMultipleList = [...multipleList];
    if (itemListRow.length === 0) {
      // eslint-disable-next-line
      updatedMultipleList = removeEmptyIndex(pageNumber, multipleList);
      currentPgeNum = updatedMultipleList.length;
      setIsPageRemoved(false);
    } else if (updatedMultipleList.length - 1 > pageNumber) {
      currentPgeNum = updatedMultipleList.length;
    } else {
      currentPgeNum = updatedMultipleList.length + 1;
    }

    if ((isPageRemoved === true && itemListRow.length > 0) || (updatedMultipleList.length - 1 > pageNumber)) {
      updatedMultipleList[pageNumber] = [...itemListRow];
      setMultipleList([...updatedMultipleList]);
    } else {
      setMultipleList([...updatedMultipleList, itemListRow]);
    }
    setPageNumber(currentPgeNum);

    setItemListRow([]);
    setRowNumber(1);
    setIsPreviousButtonDisabled(false);
    setIsNextButtonDisabled(true);
    setIsNewListButtonDisabled(true);
    const checkbox = document.getElementById("item-checkbox-" + clickedRowId);
    checkbox.checked = false;
    setIsEditClicked(false);
    setCheckedId(false);
    setItem("");
    setQuantity("");
    setUnit("--");
  }

  useEffect(() => {

  }, [editErrorMsg, addErrorMsgItemInput, addErrorMsgQuantity]);

  useEffect(() => {
    console.log("isNewListButto nDisabled" + isNewListButtonDisabled);
  }, [isNewListButtonDisabled]);

  useEffect(() => {
    console.log("MultiDim Array => " + multipleList);
    // calculateTotalPrice();
  }, [multipleList]);

  function handlePrevious() {
    let currentPgeNum;
    let updatedMultipleList = [...multipleList];
    if (isPageRemoved === true || itemListRow.length === 0) {
      // eslint-disable-next-line
      updatedMultipleList = removeEmptyIndex(pageNumber, multipleList);
      setMultipleList([...updatedMultipleList]);
      currentPgeNum = pageNumber - 1;
      setIsPageRemoved(false);
    } else {
      currentPgeNum = pageNumber - 1;
    }

    setItemListRow([...updatedMultipleList[currentPgeNum]]);
    setRowNumber(itemListRow.length);
    if (currentPgeNum >= 0) {
      setPageNumber(currentPgeNum);
    }

    if (currentPgeNum > 0) {
      setIsPreviousButtonDisabled(false);
    } else {
      setIsPreviousButtonDisabled(true);
    }

    if (currentPgeNum < updatedMultipleList.length) {
      if (itemListRow.length === 0) {
        if (currentPgeNum === updatedMultipleList.length - 1) {
          setIsNextButtonDisabled(true);
          setIsNewListButtonDisabled(false);
        } else {
          setIsNextButtonDisabled(false);
          setIsNewListButtonDisabled(false);
        }
      } else {
        setIsNextButtonDisabled(false);
        setIsNewListButtonDisabled(false);
      }
    } else {
      setIsNextButtonDisabled(true);
    }
    if (itemListRow.length > 0) {
      updatedMultipleList[pageNumber] = itemListRow;
      setMultipleList([...updatedMultipleList]);
    }
    setItem("");
    setQuantity("");
    setUnit("--");
    setClickedRowId();
    const checkbox = document.getElementById("item-checkbox-" + clickedRowId);
    checkbox.checked = false;
    setEditErrorMsg("");
    setAddErrorMsgItemInput("");
    setAddErrorMsgQuantity("");
  }

  useEffect(() => {
    console.log("isPreviousButtonEnabled => " + isPreviousButtonDisabled);
  }, [isPreviousButtonDisabled]);

  function handleNext() {
    let currentPgeNum;
    let updatedMultipleList = [...multipleList];
    if (isPageRemoved === true) {
      if (itemListRow.length === 0) {
        // eslint-disable-next-line
        updatedMultipleList = removeEmptyIndex(pageNumber, multipleList);
        setMultipleList([...updatedMultipleList]);
        currentPgeNum = pageNumber;
      } else {
        updatedMultipleList[pageNumber] = [...itemListRow];
        setMultipleList([...updatedMultipleList]);
        currentPgeNum = pageNumber + 1;
      }
      setIsPageRemoved(false);
    } else {
      currentPgeNum = pageNumber + 1;
    }

    if (currentPgeNum === updatedMultipleList.length - 1) {
      setItemListRow([...updatedMultipleList[currentPgeNum]]);
      setRowNumber(itemListRow.length);
      setPageNumber(currentPgeNum);
      setIsNextButtonDisabled(true);
      setIsNewListButtonDisabled(false);
    } else if (currentPgeNum < updatedMultipleList.length) {
      setItemListRow([...updatedMultipleList[currentPgeNum]]);
      setRowNumber(itemListRow.length);
      setPageNumber(currentPgeNum);
      setIsNextButtonDisabled(false);
      setIsNewListButtonDisabled(false);
    } else {
      setIsNextButtonDisabled(true);
    }

    if (currentPgeNum > 0) {
      setIsPreviousButtonDisabled(false);
    } else {
      setIsPreviousButtonDisabled(true);
    }

    if (itemListRow.length > 0) {
      updatedMultipleList[pageNumber] = itemListRow;
      setMultipleList(updatedMultipleList);
    }
    setItem("");
    setQuantity("");
    setUnit("--");
    setClickedRowId();
    const checkbox = document.getElementById("item-checkbox-" + clickedRowId);
    checkbox.checked = false;
    setEditErrorMsg("");
    setAddErrorMsgItemInput("");
    setAddErrorMsgQuantity("");
  }

  useEffect(() => {
    console.log("isNextButtonEnabled => " + isNextButtonDisabled);
  }, [isNextButtonDisabled]);

  useEffect(() => {
    console.log("pageNumber ===> " + pageNumber);
  }, [pageNumber]);

  return (
    <div className="main-container">
      <table>
        <caption className="tableName"><h2>Shopping List</h2></caption>
        <thead>
          <tr>
            <th>
              <button className="add-btn" onClick={addNewRow}>+</button>
            </th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
          <tr>
            <td></td>
            <td>
              <input className="item-name-input" type="text" onChange={handleItemChange} value={item} />
              <div className="add-error-msg">{addErrorMsgItemInput}</div>
            </td>
            <td>
              <input className="number-of-items-input" type="text" onChange={handleQuantityChange} value={quantity} />
              <select name="unit-input" id="unit-input" onChange={handleUnit} value={unit}>
                <option value="default">--</option>
                <option value="lbs">lbs</option>
                <option value="pieces">pieces</option>
                <option value="liters">liters</option>
              </select>
              <div className="add-error-msg">{addErrorMsgQuantity}</div>
            </td>
            <td>
              <input id={"price-input"} type="text" onChange={handlePrice} value={price} />
              <select id="price-opt" onChange={handlePriceOption} value={priceOption}>
                <option value="total">total</option>
                <option value="per-unit" >per-unit</option>
              </select>
            </td>
          </tr>
        </thead>
        <tbody>
          {itemListRow.map(eachRow => eachRow)}
          <tr>
            <td colSpan="4">Sum:</td>
            <td>{"$ " + totalPrice}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr className="footer-section">
            <td className="footer-col" colSpan="5">
              <button className="previous-btn footer-btn" onClick={handlePrevious} disabled={isPreviousButtonDisabled}>Previous List</button>
              <button className="new-list-btn footer-btn" onClick={handleNewList} disabled={isNewListButtonDisabled}>New List</button>
              <button className="edit-btn footer-btn" onClick={handleEdit}>Edit</button>
              <button className="clear-btn footer-btn" onClick={handleClear}>Clear</button>
              <button className="clear-all-btn footer-btn" onClick={handleClearAll}>Clear All</button>
              <button className="next-btn footer-btn" onClick={handleNext} disabled={isNextButtonDisabled} >Next List</button>
              <div className="add-error-msg">{editErrorMsg}</div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;