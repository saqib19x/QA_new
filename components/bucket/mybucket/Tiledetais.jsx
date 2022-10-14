import React from 'react'

const Tiledetais = () => {
  return (
    <div className=' border-t py-4 px-6'>
     <div className=' flex items-center gap-4'>
        {[1,2,3,4].map(ele=>{
            return <div key={ele} className='px-4 py-0.5 border-[1.5px] rounded-full border-prime-red '>Parking space</div>
        })}
     </div>
     <div className='flex mt-4 gap-2'>
        <div className=' font-bold'>Note :</div>
        <p className='w-[80%] leading-5 mt-0.5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed varius ipsum, est. Aenean ultrices ullamcorper dolor pharetra. In lorem et eros, maecenas vestibulum, in interdum.</p>
    </div>
    <audio src="" controls className='mt-2'></audio>
    </div>
  )
}

export default Tiledetais