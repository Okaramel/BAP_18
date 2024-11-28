import jsonwebtoken from "jsonwebtoken";

export const generateToken = (admin) => {
    return jsonwebtoken.sign(
        {
            id: admin.id,
            email: admin.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "24h",
        }
    );
};

export const verifyToken = (token) => {
    return jsonwebtoken.verify(token, process.env.JWT_SECRET);
};
