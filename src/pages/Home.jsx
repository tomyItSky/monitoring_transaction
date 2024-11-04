import { useEffect, useState } from "react";
import TitleHeader from "../component/TitleHeader";
import { apiUsers, summaryData } from "../utils/voucherAPI";
import CardDashboard from "../component/CardDashboard";
import { BsTicketPerforated } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import CustomDatePicker from "../component/CustomDatePicker";

function Home() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [dataSummary, setDataSummary] = useState("");
  const [dateFilter, setDateFilter] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDataUsers();
    summary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDateApply = (range) => {
    setSelectedRange(range);
  };

  const fetchDataUsers = async () => {
    try {
      const response = await apiUsers.detailUsers();
      setUserName(response.data.Name);
      setUserEmail(response.data.Email);
    } catch (error) {
      console.log(error);
    }
  };

  const summary = async () => {
    setIsLoading(true);
    try {
      let params = {};

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

      const response = await summaryData.summary(params);
      setDataSummary(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-h-screen max-w-full">
        <TitleHeader
          title={"Hallo " + userName}
          subtitle={"Welcome to your dashboard " + userEmail}
        />

        <div className="border-b border-gray-200 w-full"></div>

        <div className="flex flex-row justify-end items-center w-full space-x-2 mt-3">
          <div className="flex flex-row justify-center items-center gap-x-2 p-2 rounded-md shadow-md border border-slate-400 cursor-pointer hover:bg-black hover:text-white">
            <CiFilter
              className="text-xl"
              onClick={() => setDateFilter(!dateFilter)}
            />
            <p className="text-xs">Filter Date</p>
          </div>
        </div>

        <div className="flex justify-between items-start w-full gap-x-2">
          <CardDashboard
            title={"Inquiry Voucher"}
            subtitle={"Total Voucher Inquiry"}
            value={
              isLoading
                ? "Loading. . . "
                : dataSummary?.totalVoucherInquiryTickets
            }
            icon={<BsTicketPerforated size={20} />}
            color={"#FFA500"}
          />
          <CardDashboard
            title={"Redemption Voucher"}
            subtitle={"Total Voucher Redemption"}
            value={
              isLoading ? "Loading. . . " : dataSummary?.totalVoucherRedemptions
            }
            icon={<BsTicketPerforated size={20} />}
            color={"#FFA500"}
          />
          <CardDashboard
            title={"Inquiry Transactions"}
            subtitle={"Total Inquiry Transactions"}
            value={
              isLoading
                ? "Loading. . . "
                : dataSummary?.totalInquiryTransactions
            }
            icon={<BsTicketPerforated size={20} />}
            color={"#FFA500"}
          />
          <CardDashboard
            title={"Payment Confirmation"}
            subtitle={"Total Payment Confirmation"}
            value={
              isLoading
                ? "Loading. . . "
                : dataSummary?.totalPaymentConfirmations
            }
            icon={<BsTicketPerforated size={20} />}
            color={"#FFA500"}
          />
        </div>
      </div>

      {dateFilter && (
        <div className="dropdown-container absolute right-10 top-52 z-10 bg-white shadow-lg border rounded-lg p-4">
          <CustomDatePicker
            onClose={() => setDateFilter(false)}
            onApply={handleDateApply}
          />
        </div>
      )}
    </>
  );
}

export default Home;
