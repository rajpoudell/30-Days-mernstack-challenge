import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import './App.css';

export const Pagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc");
  const recordsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Sorting and slicing the data for the current page
  const sortedData = [...data].sort((a, b) => {
    const order = sortOrder === "asc" ? 1 : -1;
    return order * (a.title.localeCompare(b.title));
  });

  const startIndex = currentPage * recordsPerPage;
  const currentRecords = sortedData.slice(startIndex, startIndex + recordsPerPage);
  const pageCount = Math.ceil(data.length / recordsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleSortChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const calculateSerialNumber = (index) => {
    return currentPage * recordsPerPage + index + 1;
  };

  return (
    <div>
      <button onClick={handleSortChange}>
        Toggle Sort Order ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>
      <ul className="ul">
        {currentRecords.map((d, index) => (
          <li key={d.id}>
            <strong>Sno:</strong> {calculateSerialNumber(index)}.
            <strong>Title:</strong> {d.title},
            <strong>Body:</strong> {d.body}
            <hr />
          </li>
        ))}
      </ul>

      <nav className="paginationBar">
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={handlePageClick}
          containerClassName={'pagination justify-content-center'}
          activeClassName={'active'}
        />
      </nav>
    </div>
  );
};
