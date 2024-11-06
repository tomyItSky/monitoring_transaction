import React, { useEffect, useState } from 'react';
import { Parking } from '../../utils/voucherAPI';
import Pagination from '../Pagging';
import LoadingTable from '../LoadingTable';
import { format } from 'date-fns';
import { HiOutlineDocumentSearch } from 'react-icons/hi';
import { CiFilter } from 'react-icons/ci';
import CustomDatePicker from '../CustomDatePicker';

export default function PaymentConfirmation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [dateFilter, setDateFilter] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const closeModal = () => {
    setIsDetailOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const params = {
          page: currentPage,
          limit: itemsPerPage,
          search: searchTerm,
        };

        if (selectedRange?.from) {
          const fromDate = new Date(selectedRange.from);
          fromDate.setDate(fromDate.getDate() + 1);
          params.from = fromDate.toISOString().split('T')[0];
        }

        if (selectedRange?.to) {
          const toDate = new Date(selectedRange.to);
          toDate.setDate(toDate.getDate() + 1);
          params.to = toDate.toISOString().split('T')[0];
        }

        const response = await Parking.payment(
          params.page,
          params.limit,
          params.search,
          params.from,
          params.to
        );
        setData(response.PaymentTransactionList);
        setTotalPages(response.totalPages);
        setTotalItems(response.totalItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [
    currentPage,
    itemsPerPage,
    totalItems,
    searchTerm,
    selectedRange?.from,
    selectedRange?.to,
  ]);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const openModal = (item) => {
    const dataResponseMerchant = JSON.parse(item.MerchantDataResponse);
    const dataRequestMerchant = JSON.parse(item.MerchantDataRequest);
    const dataResponsePOST = JSON.parse(item.POSTDataResponse);
    const dataRequestPOST = JSON.parse(item.POSTDataRequest);

    const data = {
      dataMerchant: {
        MerchantDataResponse: dataResponseMerchant,
        MerchantDataRequest: dataRequestMerchant,
      },
      dataPOST: {
        POSTDataResponse: dataResponsePOST,
        POSTDataRequest: dataRequestPOST,
      },
    };

    setSelectedDetail(data);
    setIsDetailOpen(true);
  };

  const handleDateApply = (range) => {
    setSelectedRange(range);
    console.log('Selected range:', range);
  };

  return (
    <div className="max-w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <input
            type="search"
            placeholder="Search"
            className="border rounded-lg p-2 w-72"
            value={searchTerm}
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

      <div className="table-container overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-lg text-xs text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-4 whitespace-nowrap">#</th>
              <th className="text-left p-4 whitespace-nowrap">Payment Date</th>
              <th className="text-left p-4 whitespace-nowrap">NMID</th>
              <th className="text-left p-4 whitespace-nowrap">
                Transaction No
              </th>
              <th className="text-left p-4 whitespace-nowrap">Amount</th>
              <th className="text-left p-4 whitespace-nowrap">Status</th>
              <th className="text-left p-4 whitespace-nowrap">
                Detail Transaction
              </th>
              <th className="text-left p-4 whitespace-nowrap">
                Status Merchant
              </th>
              <th className="text-left p-4 whitespace-nowrap">Status POST</th>
              <th className="text-left p-4 whitespace-nowrap"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="10" className="text-center p-10">
                  <LoadingTable />
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((item, index) => {
                const dataParsingMerchant = JSON.parse(
                  item.MerchantDataResponse
                );
                const dataParsingPost = JSON.parse(item.POSTDataResponse);
                const dataParsingDataDetail = JSON.parse(
                  item.DataDetailResponse
                );

                return (
                  <tr
                    key={index}
                    className="border-b border-slate-300 hover:bg-gray-100"
                  >
                    <td className="p-4 whitespace-nowrap">{index + 1}</td>
                    <td className="p-4 whitespace-nowrap">
                      {format(
                        new Date(item.PaymentDate),
                        'dd-MMM-yyyy HH:mm:ss'
                      )}
                    </td>
                    <td className="p-4 whitespace-nowrap">{item.NMID}</td>
                    <td className="p-4 whitespace-nowrap">
                      {item.TransactionNo}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        maximumFractionDigits: 0,
                      }).format(item?.Amount ?? 0)}
                    </td>
                    <td
                      className={`p-4 whitespace-nowrap ${
                        item?.PaymentStatus === 'PAID'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {item?.PaymentStatus ?? '-'}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex flex-col justify-start items-start">
                        <p>PartnerID : {dataParsingDataDetail?.partnerID}</p>
                        <p>
                          Payment Date : {dataParsingDataDetail?.paymentDate}
                        </p>
                      </div>
                    </td>
                    <td
                      className={`p-4 whitespace-nowrap ${
                        dataParsingMerchant?.responseStatus === 'Success'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {dataParsingMerchant?.responseStatus ?? '-'}
                    </td>
                    <td
                      className={`p-4 whitespace-nowrap ${
                        dataParsingPost?.responseStatus === 'Success'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {dataParsingPost?.responseStatus ?? '-'}
                    </td>
                    <td>
                      <HiOutlineDocumentSearch
                        size={20}
                        className="text-blue-500 cursor-pointer"
                        onClick={() => openModal(item)}
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="10" className="text-center p-4">
                  <p>No data available</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center w-full">
        <div className="flex flex-row justify-start items-center gap-x-3">
          <p>
            Show Result{' '}
            <strong>
              {currentPage} - {itemsPerPage}
            </strong>{' '}
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
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {isDetailOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-5 rounded shadow-md w-3/4 text-right">
            <div className="flex justify-between items-center w-full border-b border-slate-400 py-5 mb-3">
              <h2 className="text-lg font-semibold text-start">
                Detail Voucher Redemption
              </h2>
              <h1 className="text-lg cursor-pointer" onClick={closeModal}>
                X
              </h1>
            </div>
            {selectedDetail && (
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold mb-4 text-start">
                  Response Merchant
                </h2>
                <table className="min-w-full bg-white border rounded-lg shadow-lg text-base text-left mb-5">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-4">Payment Date</th>
                      <th className="p-4">Transaction No</th>
                      <th className="p-4">Partner ID</th>
                      <th className="p-4">Transaction Status</th>
                      <th className="p-4">Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4">
                        {
                          selectedDetail.dataMerchant.MerchantDataResponse.data
                            .paymentDate
                        }
                      </td>
                      <td className="p-4">
                        {
                          selectedDetail.dataMerchant.MerchantDataResponse.data
                            .transactionNo
                        }
                      </td>
                      <td className="p-4">
                        {
                          selectedDetail.dataMerchant.MerchantDataResponse.data
                            .partnerID
                        }
                      </td>
                      <td className="p-4">
                        {
                          selectedDetail.dataMerchant.MerchantDataResponse.data
                            .transactionStatus
                        }
                      </td>
                      <td className="p-4">
                        {
                          selectedDetail.dataMerchant.MerchantDataResponse.data
                            .paymentStatus
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
                <h2 className="text-lg font-semibold mb-4 text-start">
                  Response POST
                </h2>
                <table className="min-w-full bg-white border rounded-lg shadow-lg text-base text-left mb-5">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-4">Payment Date</th>
                      <th className="p-4">Transaction No</th>
                      <th className="p-4">Partner ID</th>
                      <th className="p-4">Transaction Status</th>
                      <th className="p-4">Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4">
                        {
                          selectedDetail.dataPOST.POSTDataResponse.data
                            .paymentDate
                        }
                      </td>
                      <td className="p-4">
                        {
                          selectedDetail.dataPOST.POSTDataResponse.data
                            .transactionNo
                        }
                      </td>
                      <td className="p-4">
                        {
                          selectedDetail.dataPOST.POSTDataResponse.data
                            .partnerID
                        }
                      </td>
                      <td className="p-4">
                        {
                          selectedDetail.dataPOST.POSTDataResponse.data
                            .transactionStatus
                        }
                      </td>
                      <td className="p-4">
                        {
                          selectedDetail.dataPOST.POSTDataResponse.data
                            .paymentStatus
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

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
