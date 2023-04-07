import React, { useEffect, useState, useRef } from "react";

function App() {
  const [rowNumber, setRowNumber] = useState(1);
  const [itemListRow, setItemListRow] = useState([]);
  const [addErrorMsg, setAddErrorMsg] = useState(<div className="add-error-msg">Fill out the existing fields</div>);
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("--");
  const [checkedId, setCheckedId] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [clickedRowId, setClickedRowId] = useState();
  const clickedRowIdRef = useRef(1);
  const [listDate, setListDate] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [multipleList, setMultipleList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isNewListButtonDisabled, setIsNewListButtonDisabled] = useState(true);
  const [isPreviousButtonDisabled, setIsPreviousButtonDisabled] = useState(true);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [isPageRemoved, setIsPageRemoved] = useState(false);

  function addNewRow() {
    if ((item !== undefined && item !== "") && (quantity !== undefined && quantity !== "") && (unit !== "--") && (isEditClicked === false)) {
      setAddErrorMsg("");
      setItemListRow([...itemListRow,
      <tr key={rowNumber} id={"row-" + rowNumber}>
        <td><input className={"item-checkbox"} id={"item-checkbox-" + rowNumber} type="radio" name="item-checkbox" onChange={handleChange} /></td>
        <td><p className={"item-name"} id={"item-name-" + rowNumber} type="text" onChange={handleItemChange}>{item}</p></td>
        <td>
          <p className="number-of-items" id={"number-of-items-" + rowNumber} type="text" onChange={handleQuantityChange}>{quantity}</p>
          <p name="unit" id={"unit-" + rowNumber}>{unit}</p>
        </td>
        <td>
          <input id={"price-input-" + rowNumber} type="text" placeholder="price" onChange={handlePrice} />
          <select name="price-opt" id={"price-opt" + rowNumber} onChange={handlePriceOption}>
            <option value="total">total</option>
            <option value="per-unit" >per-unit</option>
          </select>
        </td>
        <td>
          <p className="TotalPrice" id={"total-price-" + rowNumber}>0</p>
        </td>
      </tr>
      ]);
      setItem("");
      setQuantity("");
      setUnit("--");
      setRowNumber(rowNumber + 1);
      setIsNewListButtonDisabled(false);
    } else if (isEditClicked === true) {
      var tempArr = [...itemListRow];
      tempArr[clickedRowId - 1] =
        <tr key={clickedRowId} id={"row-" + clickedRowId}>
          <td><input className={"item-checkbox"} id={"item-checkbox-" + clickedRowId} type="radio" name="item-checkbox" onChange={handleChange} /></td>
          <td><p className={"item-name"} id={"item-name-" + clickedRowId} type="text" onChange={handleItemChange}>{item}</p></td>
          <td>
            <p className="number-of-items" id={"number-of-items-" + clickedRowId} type="text" onChange={handleQuantityChange}>{quantity}</p>
            <p name="unit" id={"unit-" + clickedRowId}>{unit}</p>
          </td>
          <td>
            <input id={"price-input-" + clickedRowId} type="text" placeholder="price" onChange={handlePrice} />
            <select name="price-opt" id={"price-opt" + clickedRowId} onChange={handlePriceOption}>
              <option value="total">total</option>
              <option value="per-unit" >per-unit</option>
            </select>
          </td>
          <td>
            <p className="TotalPrice" id={"total-price-" + clickedRowId}>0</p>
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
      const defaultCheckbox = document.getElementById("item-checkbox-" + clickedRowId);
      if (defaultCheckbox) {
        defaultCheckbox.checked = true;
      }
    } else {
      setAddErrorMsg(<div key="errorMsg" className="add-error-msg">Fill out the existing fields</div>);
    }
  }

  useEffect(() => {
    setAddErrorMsg("");
    console.log(itemListRow);
    calculateTotalPrice();
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
    let priceOption = document.getElementById("price-opt" + rowNumber);
    let selecedOpt = priceOption.value;
    let tempTotal = 0;
    if (selecedOpt === "total") {
      if (event.target.value !== "") {
        tempTotal = event.target.value;
      }
    } else if (selecedOpt === "per-unit") {
      if (event.target.value !== "") {
        tempTotal = quantity * event.target.value;
      }
    }
    const totalValue = document.getElementById("total-price-" + rowNumber);
    totalValue.textContent = tempTotal;
    calculateTotalPrice();
  }

  function handlePriceOption(event) {
    const inputPriceVal = document.getElementById("price-input-" + rowNumber);
    let temp = inputPriceVal.value;
    let tempTotal = 0;
    if (event.target.value === "total") {
      if (temp !== "") {
        tempTotal = temp;
      }
    } else if (event.target.value === "per-unit") {
      if (temp !== "") {
        tempTotal = quantity * temp;
      }
    }
    const totalValue = document.getElementById("total-price-" + rowNumber);
    totalValue.textContent = tempTotal;
    calculateTotalPrice();
  }

  function calculateTotalPrice() {
    let totalPrice = 0;
    const totalPrices = document.querySelectorAll('.TotalPrice');
    totalPrices.forEach(price => {
      totalPrice += parseFloat(price.textContent);
    });
    setTotalPrice(totalPrice);
  }

  function handleChange(event) {
    // const defaultCheckbox = document.getElementById("item-checkbox-" + clickedRowId);
    // if (defaultCheckbox) {
    //   defaultCheckbox.checked = false;
    // }
    let tempId = event.target.parentNode.parentNode.id;
    tempId = tempId.substring(4);
    setClickedRowId(parseFloat(tempId));
    setCheckedId(true);
    // const checkbox = document.getElementById("item-checkbox-" + tempId);
    // if (parseFloat(tempId) === rowNumber) {
    //   checkbox.checked = true;
    // } else {
    //   checkbox.checked = false;
    // }
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
    setIsEditClicked(true);
    if (checkedId === true) {
      handleItemChange(false);
      handleQuantityChange(false);
      handleUnit(false);
    }
  }

  function removePage() {
    setItemListRow([]);
    setIsPageRemoved(true);
    const tempArray = [...multipleList];
    tempArray.splice(pageNumber, 1);
    setMultipleList([...tempArray]);
    if (tempArray.length - 1 > 0) {
      if (tempArray.length - 1 > pageNumber) {
        console.log("We are here");
      } else if (tempArray.length - 1 === pageNumber) {
        setPageNumber(pageNumber - 1)
      } else {
        setPageNumber(tempArray.length - 1)
      }
    } else {
      setPageNumber(0);
    }
  }

  function handleClear() {
    let tempItemList = [...itemListRow];
    if (tempItemList.length > 1) {
      tempItemList.splice(clickedRowId - 1, 1);
      setItemListRow(tempItemList);
    } else {
      removePage();
    }
    const checkbox = document.getElementById("item-checkbox-" + clickedRowId);
    checkbox.checked = false;
  }

  useEffect(() => {
    console.log("isPageRemoved ==> " + isPageRemoved);
  }, [isPageRemoved]);

  function handleClearAll() {
    removePage();
  }

  function handleDateInput(event) {
    const newDate = event.target.value;
    setListDate([...listDate, newDate]);
    console.log(listDate);
    console.log(listDate[0]);
  }

  useEffect(() => {
    console.log(listDate);
  }, [listDate]);

  function handleNewList() {
    let currentPgeNum;
    if (isPageRemoved === true) {
      currentPgeNum = multipleList.length;
      setIsPageRemoved(false);
    } else {
      currentPgeNum = multipleList.length + 1;
    }

    if (multipleList.length > 0 && pageNumber !== multipleList.length) {
      const tempArray = [...multipleList];
      if (itemListRow.length > 0) {
        tempArray[pageNumber] = itemListRow;
        setMultipleList(tempArray);
      }
      // else {
      // tempArray.splice(pageNumber, 1);
      // setMultipleList(tempArray);
      // }
      setPageNumber(tempArray.length);
    } else {
      setMultipleList([...multipleList, itemListRow]);
      setPageNumber(currentPgeNum);
    }
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
    console.log("isNewListButto nDisabled" + isNewListButtonDisabled);
  }, [isNewListButtonDisabled]);

  useEffect(() => {
    console.log("MultiDim Array => " + multipleList);
    calculateTotalPrice();
  }, [multipleList]);

  function handlePrevious() {
    let currentPgeNum;
    if (isPageRemoved === true) {
      currentPgeNum = pageNumber;
      setIsPageRemoved(false);
    } else {
      currentPgeNum = pageNumber - 1;
    }

    setItemListRow([...multipleList[currentPgeNum]]);
    setRowNumber(itemListRow.length);
    if (currentPgeNum >= 0) {
      setPageNumber(currentPgeNum);
    }

    if (currentPgeNum > 0) {
      setIsPreviousButtonDisabled(false);
    } else {
      setIsPreviousButtonDisabled(true);
    }

    if (currentPgeNum < multipleList.length) {
      if (itemListRow.length === 0) {
        if (currentPgeNum === multipleList.length - 1) {
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
    const tempArray = [...multipleList];
    if (itemListRow.length > 0) {
      tempArray[pageNumber] = itemListRow;
      setMultipleList([...tempArray]);
    }
    setItem("");
    setQuantity("");
    setUnit("--");
    setClickedRowId();
    const checkbox = document.getElementById("item-checkbox-" + clickedRowId);
    checkbox.checked = false;
  }

  function handleNext() {
    let currentPgeNum;
    if (isPageRemoved === true) {
      currentPgeNum = pageNumber;
      if (pageNumber < multipleList.length - 1) {
        currentPgeNum++;
      }
      setIsPageRemoved(false);
    } else {
      currentPgeNum = pageNumber + 1;
    }

    if (currentPgeNum === multipleList.length - 1) {
      setItemListRow([...multipleList[currentPgeNum]]);
      setRowNumber(itemListRow.length);
      setPageNumber(currentPgeNum);
      setIsNextButtonDisabled(true);
      setIsNewListButtonDisabled(false);
    } else if (currentPgeNum < multipleList.length) {
      setItemListRow([...multipleList[currentPgeNum]]);
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

    const tempArray = [...multipleList];
    if (itemListRow.length > 0) {
      tempArray[pageNumber] = itemListRow;
      setMultipleList(tempArray);
    }
    setItem("");
    setQuantity("");
    setUnit("--");
    setClickedRowId();
    const checkbox = document.getElementById("item-checkbox-" + clickedRowId);
    checkbox.checked = false;
  }

  useEffect(() => {
    console.log("isPreviousButtonEnabled => " + isPreviousButtonDisabled);
  }, [isPreviousButtonDisabled]);

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
              <input type="date" value={listDate.length > 0 ? listDate[0] : ""} onChange={handleDateInput} />
            </th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <button className="add-btn" onClick={addNewRow}>+</button>
              <div className="add-container">
                {addErrorMsg}
              </div>
            </td>
            <td><input className="item-name-input" type="text" onChange={handleItemChange} value={item} /></td>
            <td>
              <input className="number-of-items-input" type="text" onChange={handleQuantityChange} value={quantity} />
              <select name="unit-input" id="unit-input" onChange={handleUnit} value={unit}>
                <option value="default">--</option>
                <option value="lbs">lbs</option>
                <option value="pieces">pieces</option>
                <option value="liters">liters</option>
              </select>
            </td>
          </tr>
          {itemListRow.map(eachRow => eachRow)}
          <tr>
            <td colSpan="4">Sum:</td>
            <td>{totalPrice}</td>
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
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;