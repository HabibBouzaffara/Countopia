// import Admin from "../models/admin.js";
// import User from "../models/user.js";
// export const getClients = async (req,res) => {
//   try {
//     const client = await User.find({ role: "client" });
//     res.status(200).json(client);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };

// export const assignClient = async (req, res) => {
//     console.log(req.body);
//     try {
//       const { adminId, clientsId } = req.body;
//       console.log(adminId, clientsId);
//       const admin = await Admin.findOneAndUpdate(
//         { adminId: adminId },
//         { $set: { clients: { $each: clientsId }} },
//       );

//       console.log(admin,"testest");

//       res.status(200).json({ msg: "Client assigned successfully"  });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   }