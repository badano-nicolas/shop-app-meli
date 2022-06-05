import React from "react";
import PropTypes from "prop-types";

const Breadcrumb = ({ categories }: any) => {
  console.log("categ ", categories);
  return (
    <div className="flex flex-row text-sm py-4 text-gray-meli pb-2 container mx-auto">
      {categories.map((category: any, index: number) => (
        <div key={category} className="padd">
          {index !== 0 && " > "}
          {category}
        </div>
      ))}
    </div>
  );
};

Breadcrumb.defaultProps = {
  categories: [],
};

export default Breadcrumb;
