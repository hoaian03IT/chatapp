import "../styles/loading.scss";

export const Loading = ({ size = "sm" }) => {
    return (
        <div className={`loading ${size}`}>
            <div className="loading-spinner"></div>
            <div className="loading-spinner-reverse"></div>
        </div>
    );
};
