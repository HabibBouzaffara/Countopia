import Conversation from "../models/conversation.js"; // Adjust the path accordingly

export const getConversation = async (req, res) => {
  try {
    const { client_id, admin_id } = req.query;
    const conversation = await Conversation.findOne({
      client_id,
      admin_id,
    });

    res.status(200).json({ conversation });
    // console.log(conversation);
  } catch (error) {
    console.error("Error fetching conversation:", error);
    throw error;
  }
};
