import React, { useEffect } from "react";

function Previous(props) {

  const removeEmptyIndex = (index, array) => {
    const updatedList = array.filter((item, i) => i !== index);
    return updatedList;
  };

  function handlePrevious() {
    let currentPgeNum;
    let updatedMultipleList = [...props.multipleList];
    if (props.isPageRemoved === true || props.itemListRow.length === 0) {
      // eslint-disable-next-line
      updatedMultipleList = removeEmptyIndex(props.pageNumber, props.multipleList);
      props.setMultipleList([...updatedMultipleList]);
      props.setIsPageRemoved(false);
    }
    // else {
    //   currentPgeNum = props.pageNumber - 1;
    // }
    currentPgeNum = props.pageNumber - 1;

    props.setItemListRow([...updatedMultipleList[currentPgeNum]]);
    props.setRowNumber(props.itemListRow.length);
    if (currentPgeNum >= 0) {
      props.setPageNumber(currentPgeNum);
    }
    if (currentPgeNum > 0) {
      props.setIsPreviousButtonDisabled(false);
    } else {
      props.setIsPreviousButtonDisabled(true);
    }

    if (currentPgeNum < updatedMultipleList.length) {
      if (props.itemListRow.length === 0) {
        if (currentPgeNum === updatedMultipleList.length - 1) {
          props.setIsNextButtonDisabled(true);
          props.setIsNewListButtonDisabled(false);
        } else {
          props.setIsNextButtonDisabled(false);
          props.setIsNewListButtonDisabled(false);
        }
      } else {
        props.setIsNextButtonDisabled(false);
        props.setIsNewListButtonDisabled(false);
      }
    } else {
      props.setIsNextButtonDisabled(true);
    }
    if (props.itemListRow.length > 0) {
      updatedMultipleList[props.pageNumber] = props.itemListRow;
      props.setMultipleList([...updatedMultipleList]);
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
    <button className="previous-btn footer-btn" onClick={handlePrevious} disabled={props.isPreviousButtonDisabled}>Previous List</button>
  );
}

export default Previous;