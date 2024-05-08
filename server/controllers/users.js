import User from "../models/user.js";
import Admin from "../models/admin.js";
import {
  generateActivationEmailHTML,
  generateDeleteHTML,
  generateRejectionHTML,
  mailTransport,
} from "../utils/mail.js";
/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userRole = req.user.role; // Get the role from the token
    if (userRole !== "superadmin") {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    const { _id } = req.body;
    const user = await User.findById(_id);
    console.log(user);
    if (!user) return res.status(404).json({ msg: "User not found" });
    if (user.role == "admin") {
      console.log("test1" + user.clients.length);
      if (user.clients.length > 0) {
        await User.updateMany(
          { _id: { $in: user.clients } }, // Find clients with IDs in the admin's clients list
          { $pull: { assigned: _id } } // Pull the admin ID from the assigned list
        );
      }
      await User.findOneAndDelete({ _id: user._id });
    } else {
      const { action } = req.query;
      await User.findByIdAndDelete(_id);
      if (action === "reject") {
        mailTransport().sendMail({
          from: "countopia@countopia.com",
          to: user.email,
          subject: "Account Declined",
          html: generateRejectionHTML(user.name),
        });
      } else if (action === "delete") {
        mailTransport().sendMail({
          from: "countopia@countopia.com",
          to: user.email,
          subject: "Account Deleted",
          html: generateDeleteHTML(user.name),
        });
      }
    }

    return res.status(200).json({ msg: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// import User from "../models/User.js";

// /* READ */
// export const getUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };

// export const getUserFriends = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);

//     const friends = await Promise.all(
//       user.friends.map((id) => User.findById(id))
//     );
//     const formattedFriends = friends.map(
//       ({ _id, firstName, lastName, occupation, location, picturePath }) => {
//         return { _id, firstName, lastName, occupation, location, picturePath };
//       }
//     );
//     res.status(200).json(formattedFriends);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };

// /* UPDATE */
// export const addRemoveFriend = async (req, res) => {
//   try {
//     const { id, friendId } = req.params;
//     const user = await User.findById(id);
//     const friend = await User.findById(friendId);

//     if (user.friends.includes(friendId)) {
//       user.friends = user.friends.filter((id) => id !== friendId);
//       friend.friends = friend.friends.filter((id) => id !== id);
//     } else {
//       user.friends.push(friendId);
//       friend.friends.push(id);
//     }
//     await user.save();
//     await friend.save();

//     const friends = await Promise.all(
//       user.friends.map((id) => User.findById(id))
//     );
//     const formattedFriends = friends.map(
//       ({ _id, firstName, lastName, occupation, location, picturePath }) => {
//         return { _id, firstName, lastName, occupation, location, picturePath };
//       }
//     );

//     res.status(200).json(formattedFriends);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };
