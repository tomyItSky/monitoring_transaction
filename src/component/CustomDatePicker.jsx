import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const CustomDatePicker = ({ onClose, onApply }) => {
  const [range, setRange] = useState({ from: null, to: null });
  const [selectedOption, setSelectedOption] = useState("");

  const handleApply = () => {
    onApply(range);
    handleClose();
  };

  const handleClose = () => {
    onClose();
  };

  const handleRangeSelect = (option) => {
    const today = new Date();
    let from, to;

    switch (option) {
      case "Today":
        from = today;
        to = today;
        break;
      case "Yesterday":
        from = new Date(today.setDate(today.getDate() - 1));
        to = from;
        break;
      case "LastWeek":
        from = new Date(today.setDate(today.getDate() - 7));
        to = new Date();
        break;
      case "ThisMonth":
        from = new Date(today.getFullYear(), today.getMonth(), 1);
        to = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case "AllTime":
        from = null;
        to = null;
        break;
      default:
        break;
    }

    setSelectedOption(option);
    setRange({ from, to });
  };

  return (
    <div className="flex text-xs">
      <div className="w-36 p-3 bg-gray-100 rounded-l-md border-r">
        <h2 className="text-sm text-start font-semibold mb-4">Select Date</h2>
        <ul className="text-start">
          {["Today", "Yesterday", "LastWeek", "ThisMonth", "AllTime"].map(
            (option) => (
              <li
                key={option}
                className={`p-2 cursor-pointer rounded-md mb-2 ${
                  selectedOption === option
                    ? "bg-blue-200 text-blue-700"
                    : "hover:bg-gray-300"
                }`}
                onClick={() => handleRangeSelect(option)}
              >
                {option.replace(/([A-Z])/g, " $1").trim()}
              </li>
            )
          )}
        </ul>
      </div>

      <div className="w-full">
        <DayPicker
          mode="range"
          selected={range}
          onSelect={(selectedRange) => setRange(selectedRange)}
          className="flex justify-center"
          showOutsideDays
          numberOfMonths={1}
        />
        <div className="flex justify-end mt-4 space-x-2">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomDatePicker;
