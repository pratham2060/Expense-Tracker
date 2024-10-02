import React from 'react';
import { BarChart, Bar, Tooltip, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

function BarChartDashboard({ budgetList }) {
  return (
    <div style={{ width: '98%', height: 410 }} className='border p-5 hover:shadow-md'>
      <h2 className='font-bold text-2xl ml-4 mb-2'>Activity</h2>
      <ResponsiveContainer>
        <BarChart
          data={budgetList}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
          <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
          <YAxis tick={{ fill: '#6b7280' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSpend" stackId="a" fill="#82ca9d" /> {/* Light Green */}
          <Bar dataKey="amount" stackId="a" fill="#8884d8" /> {/* Light Blue */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartDashboard;
