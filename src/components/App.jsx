import React, { useEffect, useState, useRef } from "react";
import Add from "./Add";
import Edit from "./Edit";
import Clear from "./Clear";
import ClearAll from "./ClearAll";
import Previous from "./Previous";
import Next from "./Next";
import NewBtn from "./NewBtn";
import FooterErrorMsg from "./FooterErrorMsg";
import TotalPrice from "./TotalPrice";
import ItemInput from "./ItemInput";
import QuantityInput from "./QuantityInput";
import PriceInput from "./PriceInput";

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
      setPrice(event.target.value);
      totalItemPrice(event.target.value, priceOption);
      if (event.target.value === "") {
        setPrice(0);
      }
    } else {
      const clickedPrice = document.getElementById(`price-input-` + clickedRowId).innerText;
      const clickedPriceVal = clickedPrice.replace("$", "");
      setPrice(clickedPriceVal);
    }
  }

  function handlePriceOption(event) {
    if (event !== false) {
      setPriceOption(event.target.value);
      totalItemPrice(price.replace("$ ", ""), event.target.value);
    } else {
      const clickedPriceOpt = document.getElementById(`price-opt-` + clickedRowId).innerText;
      setPriceOption(clickedPriceOpt);
    }
  }

  function totalItemPrice(itemPrice, priceType) {
    itemPrice = itemPrice.trim();
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
    calculateTotalPrice();
    if (itemListRow.length === 0) {
      setIsNewListButtonDisabled(true);
    }
  }, [itemListRow]);

  useEffect(() => {
    console.log("Price =======> " + price);
  }, [price]);

  useEffect(() => {
    console.log("Price =======> " + priceOption);
  }, [priceOption]);


  useEffect(() => {
    console.log("Price =======> " + totalItemCost);
  }, [totalItemCost]);


  useEffect(() => {
    console.log("Price =======> " + totalPrice);
  }, [totalPrice]);

  useEffect(() => {
    console.log("current " + clickedRowId)
    if (clickedRowId !== "" && clickedRowId !== undefined) {
      clickedRowIdRef.current = clickedRowId;
    } else {
      clickedRowIdRef.current = 1;
    }
  }, [clickedRowId]);

  useEffect(() => {
    console.log("isPageRemoved ==> " + isPageRemoved);
  }, [isPageRemoved]);

  useEffect(() => {

  }, [editErrorMsg, addErrorMsgItemInput, addErrorMsgQuantity]);

  useEffect(() => {
    console.log("isNewListButto nDisabled" + isNewListButtonDisabled);
  }, [isNewListButtonDisabled]);

  useEffect(() => {
    console.log("MultiDim Array => " + multipleList);
    // calculateTotalPrice();
  }, [multipleList]);

  useEffect(() => {
    console.log("isNextButtonEnabled => " + isNextButtonDisabled);
  }, [isNextButtonDisabled]);

  useEffect(() => {
    console.log("isPreviousButtonDisabled => " + isPreviousButtonDisabled);
  }, [isPreviousButtonDisabled])

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
              <Add
                itemListRow={itemListRow}
                setItemListRow={setItemListRow}
                item={item}
                setItem={setItem}
                quantity={quantity}
                setQuantity={setQuantity}
                unit={unit}
                setUnit={setUnit}
                isEditClicked={isEditClicked}
                setIsEditClicked={setIsEditClicked}
                setAddErrorMsgItemInput={setAddErrorMsgItemInput}
                setAddErrorMsgQuantity={setAddErrorMsgQuantity}
                rowNumber={rowNumber}
                setRowNumber={setRowNumber}
                price={price}
                setPrice={setPrice}
                priceOption={priceOption}
                setPriceOption={setPriceOption}
                totalItemCost={totalItemCost}
                setIsNewListButtonDisabled={setIsNewListButtonDisabled}
                clickedRowId={clickedRowId}
                setClickedRowId={setClickedRowId}
                setCheckedId={setCheckedId}
                setEditErrorMsg={setEditErrorMsg}
              />
            </th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
          <tr>
            <td></td>
            <ItemInput
              handleItemChange={handleItemChange}
              item={item}
              addErrorMsgItemInput={addErrorMsgItemInput}
            />
            <QuantityInput
              handleQuantityChange={handleQuantityChange}
              quantity={quantity}
              handleUnit={handleUnit}
              unit={unit}
              addErrorMsgQuantity={addErrorMsgQuantity}
            />
            <PriceInput
              price={price}
              handlePrice={handlePrice}
              priceOption={priceOption}
              handlePriceOption={handlePriceOption}
            />
          </tr>
        </thead>
        <tbody>
          {itemListRow.map(eachRow => eachRow)}
          <TotalPrice totalPrice={totalPrice} />
        </tbody>
        <tfoot>
          <tr className="footer-section">
            <td className="footer-col" colSpan="5">
              <Previous
                itemListRow={itemListRow}
                setItemListRow={setItemListRow}
                multipleList={multipleList}
                setMultipleList={setMultipleList}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                isPageRemoved={isPageRemoved}
                setIsPageRemoved={setIsPageRemoved}
                setRowNumber={setRowNumber}
                isPreviousButtonDisabled={isPreviousButtonDisabled}
                setIsPreviousButtonDisabled={setIsPreviousButtonDisabled}
                setIsNextButtonDisabled={setIsNextButtonDisabled}
                setIsNewListButtonDisabled={setIsNewListButtonDisabled}
                setItem={setItem}
                setQuantity={setQuantity}
                setUnit={setUnit}
                price={price}
                priceOption={priceOption}
                setPrice={setPrice}
                setPriceOption={setPriceOption}
                clickedRowId={clickedRowId}
                setClickedRowId={setClickedRowId}
                setEditErrorMsg={setEditErrorMsg}
                setAddErrorMsgItemInput={setAddErrorMsgItemInput}
                setAddErrorMsgQuantity={setAddErrorMsgQuantity}
              />
              <NewBtn
                itemListRow={itemListRow}
                setItemListRow={setItemListRow}
                multipleList={multipleList}
                setMultipleList={setMultipleList}
                isPageRemoved={isPageRemoved}
                setIsPageRemoved={setIsPageRemoved}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                clickedRowId={clickedRowId}
                setClickedRowId={setClickedRowId}
                isNewListButtonDisabled={isNewListButtonDisabled}
                setIsNewListButtonDisabled={setIsNewListButtonDisabled}
                setEditErrorMsg={setEditErrorMsg}
                setAddErrorMsgItemInput={setAddErrorMsgItemInput}
                setAddErrorMsgQuantity={setAddErrorMsgQuantity}
                setRowNumber={setRowNumber}
                setIsPreviousButtonDisabled={setIsPreviousButtonDisabled}
                setIsNextButtonDisabled={setIsNextButtonDisabled}
                setIsEditClicked={setIsEditClicked}
                setCheckedId={setCheckedId}
                setItem={setItem}
                setUnit={setUnit}
                setQuantity={setQuantity}
                price={price}
                priceOption={priceOption}
                setPrice={setPrice}
                setPriceOption={setPriceOption}
              />
              <Edit
                checkedId={checkedId}
                setIsEditClicked={setIsEditClicked}
                handleItemChange={handleItemChange}
                handleQuantityChange={handleQuantityChange}
                handleUnit={handleUnit}
                setEditErrorMsg={setEditErrorMsg}
                handlePrice={handlePrice}
                handlePriceOption={handlePriceOption}
                setAddErrorMsgItemInput={setAddErrorMsgItemInput}
                setAddErrorMsgQuantity={setAddErrorMsgQuantity}
              />
              <Clear
                itemListRow={itemListRow}
                setItemListRow={setItemListRow}
                checkedId={checkedId}
                setCheckedId={setCheckedId}
                clickedRowId={clickedRowId}
                setClickedRowId={setClickedRowId}
                setIsPageRemoved={setIsPageRemoved}
                setEditErrorMsg={setEditErrorMsg}
                setAddErrorMsgItemInput={setAddErrorMsgItemInput}
                setAddErrorMsgQuantity={setAddErrorMsgQuantity}
              />
              <ClearAll
                setItemListRow={setItemListRow}
                setIsPageRemoved={setIsPageRemoved}
                setEditErrorMsg={setEditErrorMsg}
                setAddErrorMsgItemInput={setAddErrorMsgItemInput}
                setAddErrorMsgQuantity={setAddErrorMsgQuantity}
                setTotalPrice={setTotalPrice}
                setCheckedId={setCheckedId}
                setClickedRowId={setClickedRowId}
              />
              <Next
                multipleList={multipleList}
                setMultipleList={setMultipleList}
                itemListRow={itemListRow}
                setItemListRow={setItemListRow}
                isPageRemoved={isPageRemoved}
                setIsPageRemoved={setIsPageRemoved}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                setRowNumber={setRowNumber}
                isNextButtonDisabled={isNextButtonDisabled}
                setIsNextButtonDisabled={setIsNextButtonDisabled}
                setIsNewListButtonDisabled={setIsNewListButtonDisabled}
                setIsPreviousButtonDisabled={setIsPreviousButtonDisabled}
                setItem={setItem}
                setQuantity={setQuantity}
                setUnit={setUnit}
                setPrice={setPrice}
                setPriceOption={setPriceOption}
                clickedRowId={clickedRowId}
                setClickedRowId={setClickedRowId}
                setEditErrorMsg={setEditErrorMsg}
                setAddErrorMsgItemInput={setAddErrorMsgItemInput}
                setAddErrorMsgQuantity={setAddErrorMsgQuantity}
              />
              <FooterErrorMsg editErrorMsg={editErrorMsg} />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;