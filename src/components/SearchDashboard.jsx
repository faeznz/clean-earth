import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

const SearchDashboard = ({
  onSearch,
  val,
  placeholder = "Cari Nama Nasabah",
}) => {
  const handleSearch = (e) => {
    const value = e.target.value;
    onSearch(value);
  };

  return (
    <div>
      <div className='mt-1 flex align-middle rounded-md shadow-sm gap-4 border border-spacing-4 p-1'>
        <IoSearch className='text-slate-200 w-7 h-7 group-hover:text-green-500' />
        <input
          type='text'
          name='search'
          id='search'
          className='focus:ring-green-500 focus:border-green-500 flex-1 block w-full rounded-md sm:text-sm border-none py-1 px-2'
          placeholder={placeholder}
          value={val}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchDashboard;
