import React from 'react';

const Feature = ({ icon, headline, description }) => {
  return (
    <div
      className="flex flex-col gap-6 text-left max-w-72 md:items-start items-center"
    >
      <div className="py-4 px-4 rounded-md border max-w-fit">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{headline}</h3> 
      <p className="text-minor text-gray-600">{description}</p> 
    </div>
  );
};

export default Feature;
