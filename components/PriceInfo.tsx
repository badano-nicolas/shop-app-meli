import React from "react";
import { Price } from "../actions/searchActions";

type PriceInfoProps = {
  price: Price;
};

const PriceInfo = ({ price }: PriceInfoProps) => {
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
