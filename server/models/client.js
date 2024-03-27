import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    clientId:{
      type: mongoose.Types.ObjectId, ref: "User" ,
    },
    companyName:{ 
      type: String,
      required: true,
    },
    codeFiscale: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    factures: Array,
  },
);

const Client = mongoose.model("Client", ClientSchema);
export default Client;