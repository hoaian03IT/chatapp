import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        if (!token) return res.status(401).json({ message: "Invalid Authentication1" });
        jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
            if (err) return res.status(401).json({ msg: "Invalid Authentication2" });

            req.user = user;
            next();
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
