import { userModel } from "../models/userModel.js";

export const calculateBMI = async (req, res) => {
  console.log(req.body);
  const user_id = req.user;
  console.log(user_id);
  const { height, weight, sex, age } = req.body;

  // if (!height || !age || !height || !weight)
  //   return res.status(400).json({ message: "Please enter all fields." });

  if (!height || height < 50 || height > 300)
    return res
      .status(400)
      .json({ message: "Please enter a valid height in centimeters." });
  if (!weight || weight < 2 || weight > 600)
    return res
      .status(400)
      .json({ message: "Please enter a valid weight in kilograms." });
  if (!age || age < 0)
    return res.status(400).json({ message: "Please enter your age ." });

  const bmi = parseFloat((weight / (height / 100) ** 2).toFixed(2));
  let bmiStatus = "";
  if (sex === "male" || sex === "female") {
    if (bmi < 18.5) bmiStatus = "Underweight";
    else if (bmi >= 18.5 && bmi <= 24.9) bmiStatus = "Healthy";
    else if (bmi >= 25 && bmi <= 29.9) bmiStatus = "Overweight";
    else if (bmi >= 30) bmiStatus = "Obese";
  } else {
    return res
      .status(400)
      .json({ message: "Invalid sex. Please select 'male' or 'female'." });
  }

  const result = await userModel.findByIdAndUpdate(
    user_id,
    { $push: { bmis: { bmi: bmi, date: Date.now(), status: bmiStatus } } },
    { new: true }
  );

  return res.status(200).json({ bmi, bmiStatus, bmis: result.bmis });
};
