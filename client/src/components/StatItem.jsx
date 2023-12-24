const StatItem = ({ count, icon, title, color, bcg, borderColor }) => {
  return (
    <div
      className={`h-28 md:h-32 xl:h-36  rounded-lg bg-base-200 shadow  border-b-8 ${borderColor} `}
    >
      <div>
        <div className='flex w-full items-center justify-between px-4 pt-4'>
          <h3 className={`text-4xl lg:text-5xl xl:text-6xl font-bold ${color}`}>
            {count}
          </h3>

          <div
            className={`text-xl md:text-2xl xl:text-3xl ${bcg} p-2  md:p-2 lg:pt-4  rounded ${color}`}
          >
            {icon}
          </div>
        </div>
      </div>
      <div className='flex justify-start px-4  '>
        <h3 className='truncate text-xl md:text-2xl xl:text-3xl tex font-medium  capitalize'>
          {title}
        </h3>
      </div>
    </div>
  );
};
export default StatItem;
