const Loader = ({ size = 50 }) => {
  return (
    <div className="loader-wrapper">
      <div
        className="loader-spinner"
        style={{ width: size, height: size }}
        aria-label="Loading"
      />
    </div>
  );
};

export default Loader;
