import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import './App.css';

export const Pagination = () => {
    
// ... (existing imports)

const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
  const recordsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/?page=${currentPage}&limit=${recordsPerPage}&sortField=name&sortOrder=${sortOrder}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error(error);
        // Handle error, e.g., show an error message to the user
      }
    };

    fetchData();
  }, [currentPage, sortOrder]);
const sortedData = [...data].sort((a, b) => {
  const order = sortOrder === "asc" ? 1 : -1;
  return order * (a.name.localeCompare(b.name));
});


  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = sortedData.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(sortedData.length / recordsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage + 1);
  };

  const handleSortChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const calculateSerialNumber = (index) => {
    return (currentPage - 1) * recordsPerPage + index + 1;
  };

  return (
    <div>
      <button onClick={handleSortChange}>Toggle Sort</button>
      <ul className="ul">
        {records.map((d,index) => (
          <li key={d.id}>
            <strong>Sno:</strong> {calculateSerialNumber(index)}.
            <strong>Name:</strong> {d.name}, 
            <strong>Job:</strong> {d.job}
            
            <hr />
          </li>
        ))}
      </ul>

      <nav className="paginationBar">
        <ReactPaginate
          pageCount={nPage}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={(selected) => handlePageClick(selected.selected)}
          containerClassName={'pagination justify-content-center'}
          activeClassName={'active'}
        />
      </nav>
    </div>
  );
};
