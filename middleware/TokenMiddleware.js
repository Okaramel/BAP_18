import jsonwebtoken from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Extraire le token

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};
