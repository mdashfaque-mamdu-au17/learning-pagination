import React, { useState, useEffect } from "react";
import { getData, columns, formatRowData } from "./components/data";
import Table from "./components/Table";
import Pagination from "./components/Paginate";

const HomePage = () => {
  const [pageData, setPageData] = useState({
    rowData: [],
    isLoading: false,
    totalPages: 0,
    totalPassengers: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setPageData((prevState) => ({
      ...prevState,
      rowData: [],
      isLoading: true,
    }));
    getData(currentPage).then((info) => {
      console.log(info);
      const { totalPages, totalPassengers, data } = info;
      setPageData({
        isLoading: false,
        rowData: formatRowData(data),
        totalPages,
        totalPassengers: 150,
      });
    });
  }, [currentPage]);

  return (
    <div>
      <p>Total Passengers: {pageData.totalPassengers || "Loading..."}</p>
      <div style={{ height: "600px" }}>
        <Table
          columns={columns}
          data={pageData.rowData}
          isLoading={pageData.isLoading}
        />
      </div>
      <Pagination
        totalRows={pageData.totalPages}
        pageChangeHandler={setCurrentPage}
        rowsPerPage={15}
      />
    </div>
  );
};

export default HomePage;
