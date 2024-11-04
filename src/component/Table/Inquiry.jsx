import React, { useEffect, useState } from "react";
import { voucher } from "../../utils/voucherAPI";
import Pagination from "../Pagging";
import LoadingTable from "../LoadingTable";
import { format } from "date-fns";
import CustomDatePicker from "../CustomDatePicker";
import { CiFilter } from "react-icons/ci";

export default function Inquiry() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleDateApply = (range) => {
    setSelectedRange(range);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const params = {
          page: page,
          limit: itemsPerPage,
          search: search,
        };

        if (selectedRange?.from) {
          const fromDate = new Date(selectedRange.from);
          fromDate.setDate(fromDate.getDate() + 1);
          params.from = fromDate.toISOString().split("T")[0];
        }

        if (selectedRange?.to) {
          const toDate = new Date(selectedRange.to);
          toDate.setDate(toDate.getDate() + 1);
          params.to = toDate.toISOString().split("T")[0];
        }

        const response = await voucher.inquiry(
          params.page,
          params.limit,
          params.search,
          params.from,
          params.to
        );
        setData(response.voucherList);
        setTotalPages(response.totalPages);
        setTotalItems(response.totalItems);
      } catch (error) {
        throw error.response.data;
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [
    page,
    itemsPerPage,
    totalItems,
    search,
    selectedRange?.from,
    selectedRange?.to,
  ]);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setPage(1); // reset ke halaman pertama saat jumlah item per halaman berubah
  };

  return (
    <div className="max-h-screen">
      <div className="flex items-center justify-between mb-4 max-w-full">
        {/* Search */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-lg p-2 w-72"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="flex flex-row justify-end items-center w-full space-x-2">
          <div className="flex flex-row justify-center items-center gap-x-2 p-2 rounded-md shadow-md border border-slate-400 cursor-pointer hover:bg-black hover:text-white">
            <CiFilter
              className="text-xl"
              onClick={() => setDateFilter(!dateFilter)}
            />
            <p className="text-xs">Filter Date</p>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <table className="min-w-full bg-white border rounded-lg shadow-lg text-xs text-start max-h-screen">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-4">#</th>
            <th className="text-left p-4">Date Inquiry</th>
            <th className="text-left p-4">Company Name</th>
            <th className="text-left p-4">Merchant ID</th>
            <th className="text-left p-4">Transaction No</th>
            <th className="text-left p-4">Created By</th>
            <th className="text-left p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="8" className="text-center p-10">
                <LoadingTable />
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((voucher, index) => (
              <tr
                key={voucher.Id}
                className="border-b border-slate-300 hover:bg-gray-100"
              >
                <td className="p-4">{index + 1}</td>
                <td className="p-4">
                  {format(new Date(voucher.CreatedOn), "dd-MMM-yyyy HH:mm:ss")}
                </td>
                <td className="p-4">{voucher.CompanyName}</td>
                <td className="p-4">{voucher.MerchantID}</td>
                <td className="p-4">{voucher.TransactionNo}</td>

                <td className="p-4">{voucher.CreatedBy}</td>
                <td
                  className={`p-4 ${
                    voucher.MerchantDataRequest !== null &&
                    voucher.MerchantDataResponse !== null
                      ? "text-green-600 bg-green-100"
                      : "text-red-600 bg-red-100"
                  }`}
                >
                  {voucher.MerchantDataRequest !== null &&
                  voucher.MerchantDataResponse !== null
                    ? "Success"
                    : "Failed"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center p-10">
                <p>No data available</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-row justify-start items-center gap-x-3">
          <p>
            Show Result{" "}
            <strong>
              {page} - {itemsPerPage}
            </strong>{" "}
            of <strong>{totalItems}</strong>
          </p>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border p-2 rounded-lg"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {dateFilter && (
        <div className="dropdown-container absolute right-10 top-52 z-10 bg-white shadow-lg border rounded-lg p-4">
          <CustomDatePicker
            onClose={() => setDateFilter(false)}
            onApply={handleDateApply}
          />
        </div>
      )}
    </div>
  );
}
