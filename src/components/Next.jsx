import React from "react";

function Next(props) {

  const removeEmptyIndex = (index, array) => {
    const updatedList = array.filter((item, i) => i !== index);
    return updatedList;
  };

  function handleNext() {
    let currentPgeNum;
    let updatedMultipleList = [...props.multipleList];
    if (props.isPageRemoved === true) {
      if (props.itemListRow.length === 0) {
        // eslint-disable-next-line
        updatedMultipleList = removeEmptyIndex(props.pageNumber, props.multipleList);
        props.setMultipleList([...updatedMultipleList]);
        currentPgeNum = props.pageNumber;
      } else {
        updatedMultipleList[props.pageNumber] = [...props.itemListRow];
        props.setMultipleList([...updatedMultipleList]);
        currentPgeNum = props.pageNumber + 1;
      }
      props.setIsPageRemoved(false);
    } else {
      currentPgeNum = props.pageNumber + 1;
    }

    if (currentPgeNum === updatedMultipleList.length - 1) {
      props.setItemListRow([...updatedMultipleList[currentPgeNum]]);
      props.setRowNumber(props.itemListRow.length);
      props.setPageNumber(currentPgeNum);
      props.setIsNextButtonDisabled(true);
      props.setIsNewListButtonDisabled(false);
    } else if (currentPgeNum < updatedMultipleList.length) {
      props.setItemListRow([...updatedMultipleList[currentPgeNum]]);
      props.setRowNumber(props.itemListRow.length);
      props.setPageNumber(currentPgeNum);
      props.setIsNextButtonDisabled(false);
      props.setIsNewListButtonDisabled(false);
    } else {
      props.setIsNextButtonDisabled(true);
    }

    if (currentPgeNum > 0) {
      props.setIsPreviousButtonDisabled(false);
    } else {
      props.setIsPreviousButtonDisabled(true);
    }

    if (props.itemListRow.length > 0) {
      updatedMultipleList[props.pageNumber] = props.itemListRow;
      props.setMultipleList(updatedMultipleList);
    }
    props.setItem("");
    props.setQuantity("");
    props.setUnit("--");
    props.setPrice("")
    props.setPriceOption("total");
    props.setClickedRowId();
    props.setEditErrorMsg("");
    props.setAddErrorMsgItemInput("");
    props.setAddErrorMsgQuantity("");
    props.setCheckedId(false);
    if (props.clickedRowId !== undefined) {
      const checkbox = document.getElementById("item-checkbox-" + props.clickedRowId);
      checkbox.checked = false;
    }
  }

  return (
    <button className="next-btn footer-btn" onClick={handleNext} disabled={props.isNextButtonDisabled} >Next List</button>
  );
}

export default Next;