import React from 'react'

export default function TitleBar({
  suject,
  complement,
  bar,
}: {
  suject: string
  complement: string
  bar: 'left' | 'right'
}) {
  return (
    <div className=" flex items-center place-items-center gap-2">
      {bar === 'left' && <div className="w-[40px] h-[2px] bg-[#484848] " />}
      <p className="text-sm font-medium uppercase md:text-[18px] ">
        <span className="text-[#484848]  ">{suject} </span>{' '}
        <span className="font-bold">{complement}</span>
      </p>
      {bar === 'right' && <div className="w-[40px] h-[2px] bg-[#484848] " />}
    </div>
  )
}
