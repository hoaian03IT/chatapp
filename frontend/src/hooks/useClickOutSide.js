import { useEffect, useState } from "react";

export default function useDetectClickOutSide(ref) {
    const [isClickOutSide, setIsClickOutSide] = useState(true);
    useEffect(() => {
        const handler = (e) => {
            if (!ref.current || !ref.current.contains(e.target)) {
                setIsClickOutSide(true);
            } else {
                setIsClickOutSide(false);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [ref]);
    return isClickOutSide;
}
