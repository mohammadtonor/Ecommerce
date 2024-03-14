import jwt from 'jsonwebtoken';

export const generateRefreshToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}

