import { toast } from "react-toastify";

export const runToast = (type, value) => {
    toast.dismiss();
    toast[type](value);
};
