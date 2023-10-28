import React from "react";
import { api } from "~/utils/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
export const Test = ({ id }: { id: string }) => {
  const { data, error } = api.event.getPriceChartPush.useQuery(
    {
      id: id,
    },
    {
      retry: false,
    },
  );
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#FFFFFF" />
          <XAxis dataKey="Time" stroke="#FFFFFF" scale="time" tick={false} />
          <YAxis stroke="#FFFFFF" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#181920",
              borderColor: "#181920",
              boxShadow:
                "0 10px 8px rgba(0, 0, 0, 0.04), 0 4px 3px rgba(0, 0, 0, 0.1)",
              color: "#FFFFFF",
              borderRadius: "10px",
              padding: "16px",
            }}
            labelFormatter={(label: Date) => {
              return new Date(label).toLocaleString();
            }}
          />
          <Legend />
          <Line type="stepBefore" dataKey="Yes" stroke="#FF5757" />
          <Line type="stepBefore" dataKey="No" stroke="#52FA7C" />
        </LineChart>
      </ResponsiveContainer>
      {error && (
        <div className="absolute flex w-full justify-center pr-10 pt-5 text-center text-neutral-content">
          <p className="flex">{error.message}</p>
        </div>
      )}
    </>
  );
};
