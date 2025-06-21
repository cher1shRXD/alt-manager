"use client"

import { signOut } from "next-auth/react"

const Logout = () => {
  return (
    <button className="w-full py-2 border rounded border-red-500 bg-container text-red-500" onClick={() => signOut()}>
      로그아웃
    </button>
  )
}

export default Logout