import React, { useEffect } from "react";

function NewBtn(props) {

  const removeEmptyIndex = (index, array) => {
    const updatedList = array.filter((item, i) => i !== index);
    return updatedList;
  };

  function handleNewList() {
    props.setEditErrorMsg("");
    props.setAddErrorMsgItemInput("");
    props.setAddErrorMsgQuantity("");
    let currentPgeNum;
    let updatedMultipleList = [...props.multipleList];
    if (props.itemListRow.length === 0) {
      // eslint-disable-next-line
      updatedMultipleList = removeEmptyIndex(props.pageNumber, props.multipleList);
      currentPgeNum = updatedMultipleList.length;
      props.setIsPageRemoved(false);
    } else if (updatedMultipleList.length - 1 > props.pageNumber) {
      currentPgeNum = updatedMultipleList.length;
    } else {
      currentPgeNum = props.pageNumber + 1;
    }

    if ((props.isPageRemoved === true && props.itemListRow.length > 0) || (updatedMultipleList.length - 1 > props.pageNumber)) {
      updatedMultipleList[props.pageNumber] = [...props.itemListRow];
      props.setMultipleList([...updatedMultipleList]);
    } else {
      // if (props.pageNumber === 0) {
      //   updatedMultipleList[props.pageNumber] = props.itemListRow;
      // } else {
      updatedMultipleList[props.pageNumber] = props.itemListRow;
      // }
      props.setMultipleList([...updatedMultipleList]);
    }
    props.setPageNumber(currentPgeNum);

    props.setItemListRow([]);
    props.setRowNumber(1);
    props.setIsPreviousButtonDisabled(false);
    props.setIsNextButtonDisabled(true);
    props.setIsNewListButtonDisabled(true);
    props.setIsEditClicked(false);
    props.setCheckedId(false);
    props.setItem("");
    props.setQuantity("");
    props.setUnit("--");
    props.setPrice("")
    props.setPriceOption("total");
    props.setClickedRowId();
    const checkbox = document.getElementById("item-checkbox-" + props.clickedRowId);
    checkbox.checked = false;
  }

  useEffect(() => {
    console.log("Price =======> " + props.price);
  }, [props.price]);

  useEffect(() => {
    console.log("Price =======> " + props.priceOption);
  }, [props.priceOption]);

  return (
    <button className="new-list-btn footer-btn" onClick={handleNewList} disabled={props.isNewListButtonDisabled}>New List</button>
  );
}

export default NewBtn;