function Logo() {
  return (
    <div>
      <h1 className='text-4xl font-extrabold text-black mb-2'>QUizz</h1>  
      <div className='h-2 w-60 flex flex-row'>
      <div className='w-10 h-full bg-red-400'></div>
      <div className='w-5 h-full bg-red-200'></div>
      <div className='w-10 h-full bg-teal-300'></div>
      <div className='w-full h-full bg-indigo-950'></div>
      </div>
    </div>
  )
}

export default Logo
