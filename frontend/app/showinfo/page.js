"use client"
import React, { useState } from 'react';
import useEmployeeStore from '../../libs/employeeStore';
import useStore from '@/useStore';
import Link from 'next/link';
import axios from 'axios';
import '../sign.css'

const Page = () => {
  const [employees, setEmployees] = useState([]);
  const [salaries, setSalaries] = useState([]);
  // const salaries = useStore(useEmployeeStore, (state) => state.salaries) ?? [];
  const total = salaries.reduce((acc, curr) => acc + curr, 0);

  const handleClear = () => {
    useEmployeeStore.setState({ salaries: [] });
  };

  const datafromdB = async () => {
    try {
      const res = await axios.get('http://localhost:5000/users');
      const data = res.data.map((item) => item.username);
      const payment=res.data.map((item)=>item.salary);
      setEmployees(data);
      setSalaries(payment);
    } catch (e) {
      console.log('Error occurred while fetching data', e);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <div className="w-full max-w-screen-lg mt-8 nav">
        <ul className="flex flex-col">
          <li className="mb-2">
            <span className="text-blue-600 hover:underline"><Link href="/adduser">Add a new employee</Link></span>
          </li>
          <li className="mb-2">
            <span className="text-blue-600 hover:underline"><Link href="/showinfo">Branch Info</Link></span>
          </li>
          <li>
            <span className="text-blue-600 hover:underline"><Link href="/employee">Employee Info</Link></span>
          </li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold">Total Salary: {total}</h2>
      <h3 className="text-xl font-bold">Number of employees working:</h3>
      <br />
      <h3 className="text-xl">{employees.length}</h3>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleClear}
      >
        Clear Salaries
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
        onClick={datafromdB}
      >
        Show Data of this Branch
      </button>
    </div>
  );
};

export default Page;
