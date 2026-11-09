import React from 'react'
interface loaderProps {
  isloading: boolean
  title: React.ReactNode
}
export default function Loader({ isloading, title }: loaderProps) {
  return (
    <div className="flex items-center ">
      {isloading ? <div className="loading loading-spinner"></div> : title}
    </div>
  )
}
