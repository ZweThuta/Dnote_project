import React from 'react'
import { Link } from 'react-router-dom'
import { SquaresPlusIcon } from "@heroicons/react/16/solid";

const Plusicon = () => {
  return (
    <Link to={"/create"} className="bg-teal-600 p-3 text-white rounded-full w-50 h-50 fixed bottom-28 right-40 cursor-pointer">
    <SquaresPlusIcon width={30} height={30}/>
  </Link>
  )
}

export default Plusicon