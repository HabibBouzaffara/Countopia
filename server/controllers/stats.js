import User from "../models/user.js";

export const profitAndExpenses = async (req, res) => {
  const userId = req.user.id; // Get the user ID from the token

  try {
    const user = await User.findById(userId);

    // Initialize arrays to store monthly losses and profits
    const monthlyExpenses = new Array(12).fill(0); // Array with 12 months initialized to 0
    const monthlyProfit = new Array(12).fill(0); // Array with 12 months initialized to 0

    // Iterate over each item in the facture array
    user.factures.forEach((invoice) => {
      // Preprocess date_facture to ensure it has the format mm/dd/yyyy
      const formattedDate = invoice.date_facture.split(" ")[0]; // Remove extra characters after the year
      const parts = formattedDate.split("/");
      const month = parseInt(parts[0]) - 1; // Months are zero-based, so subtract 1
      // Calculate total amount for the invoice
      const taxes = invoice.taxe * invoice.nombre_unit;
      const negativeTotal = invoice.total < 0 ? Math.abs(invoice.total) : 0;
      const total = taxes + negativeTotal;
      const totalNet = parseFloat(invoice.total_net);
      // Add total to corresponding month in arrays
      monthlyExpenses[month] += Math.abs(total);
      monthlyProfit[month] += totalNet;
    });

    res.status(200).json({ monthlyExpenses, monthlyProfit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const revenueRate = async (req, res) => {
  const userId = req.user.id; // Get the user ID from the token

  try {
    const user = await User.findById(userId);

    const monthlyRevenue = new Array(12).fill(0); // Array with 12 months initialized to 0

    // Iterate over each item in the facture array
    user.factures.forEach((invoice) => {
      // Preprocess date_facture to ensure it has the format mm/dd/yyyy
      const formattedDate = invoice.date_facture.split(" ")[0]; // Remove extra characters after the year
      const parts = formattedDate.split("/");
      const month = parseInt(parts[0]) - 1; // Months are zero-based, so subtract 1
      // Calculate total amount for the invoice
      const total = parseFloat(invoice.total);
      // Add total to monthly revenue if it's positive
      if (total > 0) {
        monthlyRevenue[month] += total;
      }
    });
    console.log(monthlyRevenue);
    res.status(200).json({ revenueRate: monthlyRevenue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const bestSeller = async (req, res) => {
  const userId = req.user.id; // Get the user ID from the token

  try {
    const user = await User.findById(userId);

    const bestSeller = {};

    // Iterate over each item in the facture array
    user.factures.forEach((invoice) => {
      // Check if nom_unit is empty or undefined
      if (!invoice.nom_unit || invoice.nom_unit.trim() === "") {
        return; // Skip this invoice if nom_unit is empty or undefined
      }
      // Preprocess date_facture to ensure it has the format mm/dd/yyyy
      const formattedDate = invoice.date_facture.split(" ")[0]; // Remove extra characters after the year
      const parts = formattedDate.split("/");
      const month = parseInt(parts[0]) - 1; // Months are zero-based, so subtract 1
      // Accumulate nombre_unit for each nom_unit
      const { nom_unit, nombre_unit, prix_unit } = invoice;
      const parsedNombreUnit = parseFloat(nombre_unit);
      const parsedPrixUnit = parseFloat(prix_unit);
      if (!bestSeller[nom_unit]) {
        bestSeller[nom_unit] = {
          totalNombreUnit: parsedNombreUnit,
          prix_unit: parsedPrixUnit,
          monthlyUnits: new Array(12).fill(0), // Initialize an array to hold monthly units
        };
      } else {
        bestSeller[nom_unit].totalNombreUnit += parsedNombreUnit;
      }
      // Add nombre_unit to the corresponding month
      bestSeller[nom_unit].monthlyUnits[month] += parsedNombreUnit;
    });

    // Convert object to array of objects for sorting
    const bestSellerArray = Object.entries(bestSeller).map(
      ([nom_unit, data]) => ({ nom_unit, ...data })
    );

    // Sort the array by totalNombreUnit in descending order
    bestSellerArray.sort((a, b) => b.totalNombreUnit - a.totalNombreUnit);

    // Get the top 3 best sellers
    const top3BestSellers = bestSellerArray.slice(0, 3);
    console.log(top3BestSellers);
    res.status(200).json({ top3BestSellers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};