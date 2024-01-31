import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import './App.css';

export const Pagination = () => {
    
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(data.length / recordsPerPage);
  const pageNumbers = [...Array(nPage + 1).keys()].slice(1);

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

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage + 1);
  };

  return (
    <div>
      <ul className="ul">
        {records.map((d, i) => (
          <li key={i}>
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
