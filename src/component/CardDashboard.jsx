import React from "react";

function CardDashboard({ title, subtitle, value, icon, color }) {
  return (
    <>
      <div className="flex flex-col items-start justify-start w-full bg-white border rounded-xl p-5 mt-5 space-y-3">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col items-start justify-start">
            <p className="font-normal text-black text-sm">{title}</p>
            <p className="font-normal text-gray-400 text-[10px]">{subtitle}</p>
          </div>
          <div
            className={`rounded-full p-1 border-l border-t border-amber-500`}
          >
            {icon}
          </div>
        </div>
        <p className="text-2xl font-semibold">
          {new Intl.NumberFormat("id-ID").format(value)}
        </p>
        <div
          className="card-dashboard__color"
          style={{ backgroundColor: color }}
        ></div>
      </div>
    </>
  );
}

export default CardDashboard;
