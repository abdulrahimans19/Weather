const Location = require("../model/WeatherModel");
const NotificationDb = require("../model/Notification");

const { verifyToken } = require("../middleware/jwtGenerate");

const addLocation = async (req, res) => {
  try {
    const {
      locationName,
      temperature,
      localTimeHr,
      currentTemp,
      ConditionText,
      currentWind,
      currentHumidity,
      currentPrecip,
      currentDirection,
      currentFeels,
      currentUV,
    } = req.body.locationData;

    const token = req.headers.authorization.split(" ")[1];
    const decoded = verifyToken(token);
    const user_Id = decoded.id;

    if (!user_Id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const location = new Location({
      userId: user_Id,
      locationName,
      temperature,
      localTimeHr,
      currentTemp,
      ConditionText,
      currentWind,
      currentHumidity,
      currentPrecip,
      currentDirection,
      currentFeels,
      currentUV,
    });

    await location.save();
    res.status(201).json({ message: "Location saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving location" });
  }
};

const saveNotifications = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = verifyToken(token);
    const user_Id = decoded.id;

    if (!user_Id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { time, emails, subject, message } = req.body;

    const settings = await NotificationDb.findOneAndUpdate(
      { userId: user_Id },
      { time, emails, subject, message },
      { new: true, upsert: true }
    );

    res.json({ message: "Notification settings saved successfully", settings });
  } catch (error) {
    console.error("Failed to save notification settings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addLocation, saveNotifications };
