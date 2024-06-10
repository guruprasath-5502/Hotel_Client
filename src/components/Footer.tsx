const Footer = () => {
  return (
    <div className='bg-blue-800 px-0 py-5'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between gap-2 items-center'>
        <span className='text-2xl text-white font-bold tracking-tight'>
          Holidays
        </span>
        <span className='text-white font-bold tracking-tight flex gap-4'>
          <p className='cursor-pointer'>Privacy Policy</p>
          <p className='cursor-pointer'>Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
