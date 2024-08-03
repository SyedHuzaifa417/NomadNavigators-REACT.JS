import React from "react";

const Error = () => {
  return (
    <div>
      <h1 className="text-4xl flex items-center justify-center text-neutral-600 dark:text-neutral-200  mt-20 font-bold ">
        404 Not Found
      </h1>
      <p className="text-4xl flex items-center justify-center text-neutral-800 dark:text-neutral-300 mt-8 font-medium">
        The requested Page is not available
      </p>
    </div>
  );
};

export default Error;
