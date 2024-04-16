import bcrypt from "bcrypt";
import User from "../models/user.js";


export const modifyProfile = async (req, res) => {
    try {
        const { _id, oldPassword, newPassword,name,email,location,phoneNumber } = req.body;
        if ((oldPassword && !newPassword) || (!oldPassword && newPassword))
            return res.status(400).json({ msg: "Both old and new password are required to reset the password" });
        if(!name && !email && !location && !phoneNumber && !oldPassword && !newPassword)
            return res.status(400).json({ msg: "Nothing to update !" });
        const user = await User.findOne({ _id });
        if (!user)
            return res.status(400).json({ msg: "User not found" });

            //Password section
        if (oldPassword && newPassword){
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch)
                return res.status(400).json({ msg: "Invalid credentials" });
            // Hash the new password
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            // Update user's password in the database
            await User.updateOne({ _id }, { password: hashedPassword });
            return res.status(200).json({ msg: "Password updated successfully" });
        }
        if (name) {
            await User.updateOne({ _id }, { name: name });
        }
        if (email) {
            await User.updateOne({ _id }, { email: email });
        }
        if (location) {
            await User.updateOne({ _id }, { location: location });
        }
        if (phoneNumber) {
            await User.updateOne({ _id }, { phoneNumber: phoneNumber });
        }
        await user.save();
        return res.status(200).json({ msg: "Profile updated successfully" });
            
        
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
