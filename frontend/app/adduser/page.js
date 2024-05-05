"use client"
import { useState } from "react"
import useEmployeeStore from '../../libs/employeeStore'
import axios from "axios"
import Link from "next/link"
import '../sign.css'

const Page = () => {
    const [name, setName] = useState("")
    const [salary, setSalary] = useState("")
    const [role, setRole] = useState("")

    const handleChange = (e, setter) => {
        setter(e.target.value)
    }

    const handleSubmit = async () => {
        try {
            const res = await axios.post(process.env.NEXT_PUBLIC_ADDUSERURI, {
                username: name,
                salary: parseFloat(salary),
                role: role
            })
            console.log("Response", res)
        } catch (e) {
            console.log("Error occurred while sending data", e)
        }
    }

    const handleSend = () => {
        const salaryValue = parseFloat(salary);
        useEmployeeStore.setState((state) => ({
            salaries: [...state.salaries, salaryValue],
        }));
        console.log(salaryValue, useEmployeeStore)
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center p-4">
           <div className="flex justify-between w-full max-w-screen-lg mx-auto mt-8 nav">
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

            <label className="mb-2">Enter employee name:</label>
            <input
                type="text"
                onChange={(e) => handleChange(e, setName)}
                value={name}
                className="border border-gray-300 rounded px-2 py-1 mb-2"
            />
            <label className="mb-2">Enter employee role:</label>
            <input
                type="text"
                onChange={(e) => handleChange(e, setRole)}
                value={role}
                className="border border-gray-300 rounded px-2 py-1 mb-2"
            />
            <label className="mb-2">Enter employee salary:</label>
            <input
                type="number"
                onChange={(e) => handleChange(e, setSalary)}
                value={salary}
                className="border border-gray-300 rounded px-2 py-1 mb-2"
            />
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Add Info</button>
            <br/>
            <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded">Send to frontend</button>
            <Link href="/" className="mt-4 text-blue-500">Home</Link>
            
        </div>
    )
}

export default Page
