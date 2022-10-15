import React from 'react'

const Tiledetais = ({Ele}) => {
  console.log(Ele)
  return (
    <div className=' border-t py-4 px-6'>
     <div className=' flex items-center gap-4'>
      {Ele.other_property_type && <div className='px-4 py-0.5 border-[1.5px] rounded-full border-prime-red '>{Ele.other_property_type}</div>}
      {Ele.sqrft && <div className='px-4 py-0.5 border-[1.5px] rounded-full border-prime-red '>{Ele.sqrft}</div>}
      {Ele?.commercial.lenght > 0 && Ele?.commercial.map((ele,i)=>{
      <div className='px-4 py-0.5 border-[1.5px] rounded-full border-prime-red' key={i}>{ele}</div>
      }) }
        {Ele?.residential.lenght > 0 && Ele?.residential.map((ele,i)=>{
      <div className='px-4 py-0.5 border-[1.5px] rounded-full border-prime-red' key={i}>{ele}</div>
      }) }
     </div>
     <div className='flex mt-4 gap-2'>
        <div className=' font-bold'>Note :</div>
        <p className='w-[80%] leading-5 mt-0.5'>{Ele.notes}</p>
    </div>
    <audio src={Ele?.audio} controls className='mt-2'></audio>
    </div>
  )
}

export default Tiledetais