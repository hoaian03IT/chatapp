import "../styles/popper.scss";

export const Popper = ({ className, children }) => {
    return <div className={`popper ${className} position-absolute`}>{children}</div>;
};
