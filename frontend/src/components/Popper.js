import "../styles/popper.scss";

export const Popper = ({ className, children }) => {
    return <div className={`popper p-2 ${className ? className : ""}`}>{children}</div>;
};
