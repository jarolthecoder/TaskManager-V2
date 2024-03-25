"use client"
import { useEffect, useState } from "react";

const calculateRange = (currentPage, totalPages) => {
  const range = [];
  const maxButtons = 3; // Number of buttons to show at a time
  let startPage = currentPage - Math.floor(maxButtons / 2);
  startPage = Math.max(startPage, 1); // Ensure startPage is not less than 1

  let endPage = startPage + maxButtons - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxButtons + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    range.push(i);
  }

  return range;
};

const sliceData = (data, page, rowsPerPage) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};


export const useTable = (projects, page, rowsPerPage) => {
  const [tableRange, setTableRange] = useState([]);
  const [slicedData, setSlicedData] = useState([]);

  useEffect(() => {
    const range = calculateRange(page, Math.ceil(projects.length / rowsPerPage));
    setTableRange([...range]);

    const slice = sliceData(projects, page, rowsPerPage);
    setSlicedData([...slice]);
  }, [projects, rowsPerPage, page]);

  return { slicedData, tableRange };
};