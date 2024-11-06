import React, { useEffect, useState } from 'react';
import { CiFilter } from 'react-icons/ci';
import LoadingTable from '../LoadingTable';
import { format } from 'date-fns';
import Pagination from '../Pagging';
import CustomDatePicker from '../CustomDatePicker';
import { apiUsers } from '../../utils/voucherAPI';
import { FaCirclePlus } from 'react-icons/fa6';
import { LuCheckCircle } from 'react-icons/lu';
import Loading from '../Loading';

function Users() {
  const [formData, setFormData] = useState({
    SetupRoleId: '',
    Name: '',
    Gender: 'M',
    Username: '',
    Email: '',
    Phone: '',
  });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [addData, setAddData] = useState(false);
  const [roleData, setRoleData] = useState([]);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleAddUsers = () => {
    setAddData(true);
  };

  const handleDateApply = (range) => {
    setSelectedRange(range);
  };

  const fetchRole = async () => {
    try {
      const response = await apiUsers.getRole();
      setRoleData(response.data);
    } catch (error) {
      console.log(error);
    }
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
          params.from = fromDate.toISOString().split('T')[0];
        }

        if (selectedRange?.to) {
          const toDate = new Date(selectedRange.to);
          toDate.setDate(toDate.getDate() + 1);
          params.to = toDate.toISOString().split('T')[0];
        }

        const response = await apiUsers.getAllUsers(
          params.page,
          params.limit,
          params.search,
          params.from,
          params.to
        );
        console.log(response);
        setData(response.UsersData);
        setTotalPages(response.totalPages);
        setTotalItems(response.totalItems);
      } catch (error) {
        setIsError(true);
        setErrorMessage(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    fetchRole();
  }, [
    page,
    itemsPerPage,
    totalItems,
    search,
    selectedRange?.from,
    selectedRange?.to,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      !formData.SetupRoleId ||
      !formData.Name ||
      !formData.Username ||
      !formData.Email ||
      !formData.Phone
    ) {
      return;
    }

    try {
      const response = await apiUsers.addUsers(formData);
      if (response.status === 'success') {
        setIsLoading(false);
        setMessage('Created data successfully');
        setStatus(true);

        setInterval(() => {
          setStatus(false);
        }, [2000]);
        setAddData(false);
      } else {
        setIsLoading(false);
        setMessage('Failed to create data');
        setStatus(false);
      }
    } catch (error) {
      console.log(error);
    }

    setAddData(false);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setPage(1); // reset ke halaman pertama saat jumlah item per halaman berubah
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="max-h-screen">
        <div className="flex items-center justify-between mb-4 max-w-full">
          {/* Search */}
          <div className="flex items-center">
            <input
              type="search"
              placeholder="Search"
              className="border rounded-lg p-2 w-72"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <div className="flex flex-row justify-end items-center w-full space-x-2">
            <div
              className="flex flex-row justify-center items-center gap-x-2 p-2 rounded-md shadow-md border border-slate-400 cursor-pointer hover:bg-black hover:text-white"
              onClick={() => setDateFilter(!dateFilter)}
            >
              <CiFilter className="text-xl" />
              <p className="text-xs">Filter Date</p>
            </div>
            <div
              className="flex flex-row justify-center items-center gap-x-2 p-2 rounded-md shadow-md border border-slate-400 cursor-pointer hover:bg-black hover:text-white"
              onClick={handleAddUsers}
            >
              <FaCirclePlus className="text-xl" />
              <p className="text-xs">Add User</p>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <table className="min-w-full bg-white border rounded-lg shadow-lg text-xs text-start max-h-screen">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-4">#</th>
              <th className="text-left p-4">Code</th>
              <th className="text-left p-4">Profile</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Last Active</th>
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
              data.map((items, index) => (
                <tr
                  key={items.Id}
                  className="border-b border-slate-300 hover:bg-gray-100"
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{items.UserCode}</td>
                  <td className="p-4">
                    <div className="flex flex-col justify-start items-start">
                      <h1 className="font-semibold">{items.Name}</h1>
                      <h1 className="font-normal text-xs text-slate-400">
                        {items.Email}
                      </h1>
                    </div>
                  </td>
                  <td className="p-4">{items.Role?.Description}</td>
                  <td className="p-4">
                    {format(
                      new Date(items.LastActivity),
                      'dd-MMM-yyyy HH:mm:ss'
                    )}
                  </td>
                  <td
                    className={`p-4 ${
                      items.UserStatus === 1
                        ? 'text-green-600 bg-green-100'
                        : 'text-red-600 bg-red-100'
                    }`}
                  >
                    {items.UserStatus === 1 ? 'Active' : 'Unactive'}
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
              Show Result{' '}
              <strong>
                {page} - {itemsPerPage}
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

      {isError && (
        <div className="fixed top-10 right-5 transform -translate-x-1/2 -translate-y-1/2 bg-red-100 border border-red-500 text-black p-4 rounded text-sm text-left min-w-72 uppercase">
          <p>{errorMessage.status}</p>
          <p>{errorMessage.message}</p>
        </div>
      )}

      {addData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/2 bg-white border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h1 className="font-bold">Create New Users</h1>
              <h1
                className="cursor-pointer font-bold"
                onClick={() => setAddData(false)}
              >
                X
              </h1>
            </div>

            <div className="border-b border-slate-300 my-5 w-full"></div>

            <form onSubmit={handleSubmit}>
              {/* Dropdown for SetupRoleId */}
              <div className="w-full grid grid-cols-2 text-start gap-2">
                {/* Name Input */}
                <div className="mb-4">
                  <label htmlFor="Name" className="block mb-2">
                    Name
                  </label>
                  <input
                    id="Name"
                    type="text"
                    name="Name"
                    value={formData.Name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter name"
                  />
                </div>

                {/* Username Input */}
                <div className="mb-4">
                  <label htmlFor="Username" className="block mb-2">
                    Username
                  </label>
                  <input
                    id="Username"
                    type="text"
                    name="Username"
                    value={formData.Username}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter username"
                  />
                </div>

                {/* Email Input */}
                <div className="mb-4">
                  <label htmlFor="Email" className="block mb-2">
                    Email
                  </label>
                  <input
                    id="Email"
                    type="email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter email"
                  />
                </div>

                {/* Phone Input */}
                <div className="mb-4">
                  <label htmlFor="Phone" className="block mb-2">
                    Phone
                  </label>
                  <input
                    id="Phone"
                    type="text"
                    name="Phone"
                    value={formData.Phone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter phone number"
                  />
                </div>

                {/* Gender Input */}
                <div className="mb-4">
                  <label htmlFor="Gender" className="block mb-2">
                    Gender
                  </label>
                  <select
                    id="Gender"
                    name="Gender"
                    value={formData.Gender}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="SetupRoleId" className="block mb-2">
                    Role
                  </label>
                  <select
                    id="SetupRoleId"
                    name="SetupRoleId"
                    value={formData.SetupRoleId}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select Role</option>
                    {roleData.map((role) => (
                      <option key={role.Id} value={role.Id}>
                        {role.Description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-right">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {status && (
        <div
          className={`fixed top-10 right-5 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-green-500 text-black p-4 rounded text-sm text-left min-w-72 uppercase transition-all duration-300 ease-in-out ${
            status ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex flex-row justify-start items-center gap-x-3">
            <LuCheckCircle size={30} className="text-green-500" />
            <div className="flex flex-col justify-start items-start gap-y-1">
              <p className="text-lg text-green-500 font-semibold">
                {'Success'}
              </p>
              <p className="text-sm text-green-500">{message}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Users;
