import User from './../models/userModel.js';


export const createUser = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password, ...other } = req.body;
        const findUser = await User.findOne({email});
        if (findUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        const newUser = new User({
            email,
            password,
            ...other
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
       throw new Error(error)
    }
}
