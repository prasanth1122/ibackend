import mongoose from "mongoose";

// Reference the `internroadmap` collection
const roadmapCollection = mongoose.connection.collection("internroadmap");

// Controller to get all roadmap data
export const getAllRoadmaps = async (req, res) => {
  try {
    const roadmaps = await roadmapCollection.find({}).toArray();
    res.status(200).json(roadmaps);
  } catch (error) {
    console.error("Error fetching all roadmaps:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get roadmap data by day
export const getRoadmapByDay = async (req, res) => {
  const { day } = req.params;
  try {
    const roadmap = await roadmapCollection.findOne({ day: parseInt(day) });
    if (!roadmap) {
      return res.status(404).json({ message: "No roadmap found for this day" });
    }
    res.status(200).json(roadmap);
  } catch (error) {
    console.error("Error fetching roadmap by day:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get roadmap data filtered by type
export const getRoadmapByType = async (req, res) => {
  const { type } = req.params;
  try {
    const roadmaps = await roadmapCollection.find({}).toArray();

    // Filter roadmaps by type
    const filteredRoadmaps = roadmaps
      .map((roadmap) => ({
        day: roadmap.day,
        date: roadmap.date,
        role: roadmap.roles[type]?.objective,
        bulletPoints: roadmap.roles[type]?.bulletPoints,
      }))
      .filter((item) => item.role); // Filter out entries with no matching type

    if (filteredRoadmaps.length === 0) {
      return res
        .status(404)
        .json({ message: "No roadmap found for this type" });
    }

    res.status(200).json(filteredRoadmaps);
  } catch (error) {
    console.error("Error fetching roadmap by type:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Controller to get roadmap data by role and day
export const getRoadmapByRoleAndDay = async (req, res) => {
  const { role, day } = req.params; // Get role and day from the request parameters

  try {
    const roadmap = await roadmapCollection.findOne({ day: parseInt(day) });

    if (!roadmap) {
      return res.status(404).json({ message: "No roadmap found for this day" });
    }

    const roleData = roadmap.roles[role]; // Extract data for the specific role
    if (!roleData) {
      return res
        .status(404)
        .json({ message: `No data found for role: ${role}` });
    }

    res.status(200).json({
      day: roadmap.day,
      date: roadmap.date,
      role,
      objective: roleData.objective,
      bulletPoints: roleData.bulletPoints,
    });
  } catch (error) {
    console.error("Error fetching roadmap by role and day:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
