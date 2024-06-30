/* eslint-disable react/prop-types */
const Wrapper = ({ children }) => {
  return (
    <div className="max-w-screen-2xl mx-auto p-4 pb-0 px-6 md:px-8">
      {children}
    </div>
  );
};

export default Wrapper;
