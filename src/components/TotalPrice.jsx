import React from "react";

function TotalPrice(props) {
  return (
    <tr>
      <td colSpan="4">Sum:</td>
      <td>{"$ " + props.totalPrice}</td>
    </tr>
  );
}

export default TotalPrice;