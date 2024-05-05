import { UserButton } from "@clerk/nextjs";
import { currentUser } from '@clerk/nextjs';
import { FaUserPlus, FaInfoCircle, FaUsers, FaTasks } from 'react-icons/fa';
import Link from 'next/link';
import './sign.css'; // Assuming sign.css contains your custom styles

export default async function Home() {
  const user = await currentUser();
  const randNumDept = () => {
    return Math.floor(Math.random() * 10) + 1;
  }
  const randNumEmp = () => {
    return Math.floor(Math.random() * 10) + 1;
  }
  const randNumTask = () => {
    return Math.floor(Math.random() * 5) + 1;
  }
  const randNumMan = () => {
    return Math.floor(Math.random() * 2) + 1;
  }
  const randNumRole = () => {
    return Math.floor(Math.random() * 6) + 1;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Hello {user.username}</h1>
      <div className="mt-8 text-center">
        <p className="text-xl">Welcome to our employee management system. Manage your employees efficiently with our easy-to-use interface.</p>
        <p className="dept-style text-lg"><FaUsers /> Number of departments: {randNumDept()}</p>
        <p className="emp-style text-lg"><FaUserPlus /> Number of Employees: {randNumEmp()}</p>
        <p className="role-style text-lg"><FaInfoCircle /> Number of Roles: {randNumRole()}</p>
        <p className="manager-style text-lg"><FaUsers /> Number of Managers: {randNumMan()}</p>
        <br />
        <p className="task-style text-lg"><FaTasks /> Total Tasks Pending: {randNumTask()}</p>
      </div>
      <div className="absolute top-0 right-0 mt-4 mr-4">
        <UserButton />
      </div>
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
    </div>
  );
}
