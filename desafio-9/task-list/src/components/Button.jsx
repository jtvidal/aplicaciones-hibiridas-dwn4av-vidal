
const Button = ({ handleClick, children, ...others }) => {
  return (
    <>
      <button onClick={handleClick} className="submit" {...others}>
        {children}
      </button>
    </>
  );
};

export default Button;
