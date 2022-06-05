import React from "react";

const PriceInfo = ({ price }: any) => {
  return (
    <div>
      {price.amount.toLocaleString("es-AR", {
        style: "currency",
        currency: price.currency,
        minimumFractionDigits: price.decimals,
      })}
    </div>
  );
};

export default PriceInfo;
