"use client"
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = ({ searchParams }) => {
  const [username, setUserName] = useState(searchParams.username);
  const [salary, setSalary] = useState(searchParams.salary);
  const [role, setRole] = useState(searchParams.role);

  const router = useRouter();

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/users/${searchParams.id}`,
        {
          username: username,
          salary: salary,
          role: role,
        }
      );
      console.log("Response", res);
      router.push("/employee");
    } catch (e) {
      console.log("Error occurred while updating data", e);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Employee Data:</h2>
      <div className="border rounded-lg p-4 mt-4 flex flex-wrap">
        <h3 className="text-lg font-bold flex-none w-1/3">Employee Name:</h3>
        <p className="text-lg flex-grow">{searchParams.username}</p>
        <h3 className="text-lg font-bold mt-2 flex-none w-1/3">Employee Salary:</h3>
        <p className="text-lg flex-grow">{searchParams.salary}</p>
        <h3 className="text-lg font-bold mt-2 flex-none w-1/3">Employee Role:</h3>
        <p className="text-lg flex-grow">{searchParams.role}</p>
      </div>
      <h2 className="mt-4 text-2xl font-bold">Enter Updated Data:</h2>
      <label className="block mt-4">Employee Name:</label>
      <input
        className="border rounded-md px-3 py-2 mt-1 w-full"
        type="text"
        onChange={(e) => handleChange(e, setUserName)}
        value={username}
      />
      <label className="block mt-4">Employee Role:</label>
      <input
        className="border rounded-md px-3 py-2 mt-1 w-full"
        type="text"
        onChange={(e) => handleChange(e, setRole)}
        value={role}
      />
      <label className="block mt-4">Enter Salary:</label>
      <input
        className="border rounded-md px-3 py-2 mt-1 w-full"
        type="number"
        onChange={(e) => handleChange(e, setSalary)}
        value={salary}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600"
        onClick={handleSave}
      >
        Update Data
      </button>
    </div>
  );
};

export default Page;
