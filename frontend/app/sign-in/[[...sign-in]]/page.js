import { SignIn } from "@clerk/nextjs";
 import './signin.css'
export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen mr-80"> 
        <SignIn />
    </div>
  )
}