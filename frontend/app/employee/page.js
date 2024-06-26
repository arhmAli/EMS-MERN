"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import '../sign.css'
const Page = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage,setCurrentPage]=useState(1)

  const fetchData = async () => {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_ADDUSERURI);
      setEmployees(res.data);
      setLoading(false);
    } catch (e) {
      console.log("Error occurred while fetching data", e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_ADDUSERURI}/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (e) {
      console.log("Error occurred while removing employee", e);
    }
  };
const indexOfFirstItem = (currentPage-1) * 3;
const indexOfLastItem = currentPage * 3;
const currentEmployee=employees.slice(indexOfFirstItem, indexOfLastItem);

const paginate=(pagenumber)=>{
  return setCurrentPage(pagenumber)
}

  return (
    <div className="container mx-auto">
     
      <h2 className="text-2xl font-bold mb-4">Employee Data</h2>
      {loading ? (
        <h2>Loading...</h2>
      ) : employees.length > 0 ? (
        <>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Employee Name</th>
              <th className="px-4 py-2">Employee Salary</th>
              <th className="px-4 py-2">Employee Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployee.map((item, ind) => (
              <tr key={item._id}>
                <td className="border px-4 py-2">{item.username}</td>
                <td className="border px-4 py-2">{item.salary}</td>
                <td className="border px-4 py-2">{item.role}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleRemove(item._id)}
                  >
                    Remove Employee
                  </button>
                  <Link
                    href={{
                      pathname: "/updateinfo",
                      query: {
                        username: item.username,
                        salary: item.salary,
                        role: item.role,
                        id: item._id,
                      },
                    }}
                  >
                    <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Update Info
                    </span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="ml-100 btn ">
        {[...Array(Math.ceil(employees.length / 3)).keys()].map((pageNumber) => (
                            <span  key={pageNumber} onClick={() => paginate(pageNumber + 1)} className="cursor-pointer mx-1 bg-blue-400 rounded-md px-2 py-1">{pageNumber + 1}</span>
                        ))}
      </div>
      </>
      ) : (
        <h2>No employees found.</h2>
      )}
    <span className="text-blue-600 hover:underline"><Link href="/">Home</Link></span>
    </div>
  );
};

export default Page;
