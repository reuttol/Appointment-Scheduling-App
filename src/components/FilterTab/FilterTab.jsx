import React, { useContext } from "react";
import { AppContext } from "../Context.js";

import './filterTab.css'

const FilterTab = () => {
    const context = useContext(AppContext);

  const renderFilterList = (list, filterName) => {
    return list.map((item) => (
      <div key={item} className="checkbox-container">
        <input
          type="checkbox"
          onChange={(e) => toggleFilter(e)}
          name={filterName}
          value={item}
        />
        <label htmlFor="">{item}</label>
      </div>
    ));
  };

  const toggleFilter = (e) => {
    console.dir(e.target.checked);
    const tempFilters = { ...context.filters };
    const { name, value } = e.target;
    if (e.target.checked) {
      tempFilters[name].push(value);
    } else {
      // const index = tempFilters[name].indexOf(value);
      // if(index !== -1)
      // tempFilters[name].splice(index, 1);
      const newArr = tempFilters[name].filter((e) => e !== value);
      tempFilters[name] = newArr;
    }
    context.setFilters(tempFilters);
  };
  return (
    <>
      <div className="filter-container">
        <h3 className="filter__header">Class Name</h3>
        <div className="filter-btns-container">
          {renderFilterList(context.classes, "classes")}
        </div>
      </div>
      <div className="filter-container">
        <h3 className="filter__header">Instructor Name</h3>
        <div className="filter-btns-container">
          {renderFilterList(context.teachers, "teachers")}
        </div>
      </div>
      <div className="filter-container">
        <h3 className="filter__header">Weekday</h3>
        <div className="filter-btns-container">
          {renderFilterList(context.weekDays, "days")}
        </div>
      </div>
    </>
  );
};

export default FilterTab;
