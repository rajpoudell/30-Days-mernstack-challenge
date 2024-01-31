import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import './App.css';

export const Pagination = () => {
    
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
  const recordsPerPage = 10;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const sortedData = [...data].sort((a, b) => {
    const order = sortOrder === "asc" ? 1 : -1;
    return order * (a.id - b.id);
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

  return (
    <div>
      <button onClick={handleSortChange}>Toggle Sort</button>
      <ul className="ul">
        {records.map((d) => (
          <li key={d.id}>
            <strong>Sno:</strong> {d.id}.
            <strong>Name:</strong> {d.title}, 
            <strong>body:</strong> {d.body}
            
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
