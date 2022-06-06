import React from "react";

type BreadcrumbProps = {
  categories: string[];
};

const Breadcrumb = ({ categories }: BreadcrumbProps) => {
  return (
    <div className="flex flex-row text-sm py-4 text-gray-meli container mx-auto">
      {categories.map((category: string, index: number) => (
        <div key={category} className="px-1 flex flex-row">
          <p> {index !== 0 && " > "}</p>
          <p
            className={
              "pl-1 " + (categories.length - 1 === index && "font-medium")
            }
          >
            {category}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
