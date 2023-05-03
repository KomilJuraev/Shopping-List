import React from "react";
import { removePage } from "./RemovePage";

function ClearAll(props) {
  function handleClearAll() {
    removePage(props);
    props.setEditErrorMsg("");
    props.setAddErrorMsgItemInput("");
    props.setAddErrorMsgQuantity("");
    props.setTotalPrice(0);
    props.setCheckedId(false);
    props.setClickedRowId();
  }

  return (
    <button className="clear-all-btn footer-btn" onClick={handleClearAll}>Clear All</button>
  );
}

export default ClearAll;