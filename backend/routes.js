const express = require('express');
const { pool, connectDb } = require('./database/connectDB'); // Import pool and connectDb
const jwt = require('jsonwebtoken');
require('dotenv').config();
const isAuth = require('./isAuth');
const isAutho = require('./isAutho');

const multer = require("multer");
const path = require("path");

// Set up storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // Limit to 5MB


//PDF 
// Multer storage for PDFs
const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "pdf_uploads/"); // Folder where PDFs will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const pdfUpload  = multer({ 
  storage: pdfStorage, 
  limits: { fileSize: 5 * 1024 * 1024 } // Limit to 5MB
});


const router = express.Router();

router.get('/clubs',isAuth, isAutho([1,2,3]), async (req, res) => {
  try {
    const [rows] = await pool.promise().query("SELECT club_name FROM club");
    if (rows.length === 0) {
      return res.status(404).json({ error: "No clubs found" });
    }
    const clubNames = rows.map(row => row.club_name);
    res.json({ clubs: clubNames });
  } catch (error) {
    console.error("Error fetching club names:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Get a player's information by ID
router.get('/player/:id',isAuth,isAutho([1,2]), async (req, res) => {
  try {
    const playerId = parseInt(req.params.id, 10);

    if (isNaN(playerId)) {
      return res.status(400).json({ error: "Invalid player ID" });
    }

    const [rows] = await pool.promise().query("SELECT * FROM player WHERE player_id = ?", [playerId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Player not found" });
    }

    res.json(rows[0]); // Return player data
  } catch (error) {
    console.error("Error fetching player:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a player's information by ID
router.put('/player/:id', isAuth, isAutho([1, 2]), async (req, res) => {
  try {
    const playerId = parseInt(req.params.id, 10);
    const {
      player_name,
      height,
      reference,
      birthday, // Ensure this is in YYYY-MM-DD format
      place_of_birth,
      description,
      position,
      qualified,
      club_id
    } = req.body;

    if (isNaN(playerId)) {
      return res.status(400).json({ error: "Invalid player ID" });
    }

    // Prepare update fields
    const fieldsToUpdate = [];
    const values = [];

    if (player_name) {
      fieldsToUpdate.push("player_name = ?");
      values.push(player_name);
    }
    if (height) {
      fieldsToUpdate.push("height = ?");
      values.push(height);
    }
    if (reference) {
      fieldsToUpdate.push("reference = ?");
      values.push(reference);
    }
    if (birthday) {
      // Validate the date format (YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(birthday)) {
        return res.status(400).json({ error: "Invalid date format for birthday. Use YYYY-MM-DD." });
      }
      fieldsToUpdate.push("birthday = ?");
      values.push(birthday);
    }
    if (place_of_birth) {
      fieldsToUpdate.push("place_of_birth = ?");
      values.push(place_of_birth);
    }
    if (description) {
      fieldsToUpdate.push("description = ?");
      values.push(description);
    }
    if (position) {
      fieldsToUpdate.push("position = ?");
      values.push(position);
    }
    if (qualified === 0 || qualified === 1 || typeof qualified === 'boolean') {
      fieldsToUpdate.push("qualified = ?");
      values.push(qualified);
    }
    if (club_id) {
      fieldsToUpdate.push("club_id = ?");
      values.push(club_id);
    }

    if (fieldsToUpdate.length === 0) {
      return res.status(400).json({ error: "No valid fields provided to update" });
    }

    values.push(playerId); // Add player ID for WHERE clause

    const query = `UPDATE player SET ${fieldsToUpdate.join(', ')} WHERE player_id = ?`;
    const [result] = await pool.promise().query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Player not found" });
    }

    res.json({ message: "Player updated successfully" });
  } catch (error) {
    console.error("Error updating player:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//delete a player
router.delete("/player/:id", isAuth, isAutho([1, 2]), async (req, res) => {
  try {
    console.log("Received player ID:", req.params.id); // Debugging log

    const playerId = parseInt(req.params.id, 10);
    if (isNaN(playerId)) {
      return res.status(400).json({ error: "Invalid player ID" });
    }

    const [result] = await pool.promise().query("DELETE FROM player WHERE player_id = ?", [playerId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Player not found" });
    }

    res.json({ message: "Player deleted successfully" });
  } catch (error) {
    console.error("Error deleting player:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//Modified:add a new player
router.post('/player', isAuth, isAutho([1, 2]), upload.single("image"), async (req, res) => {
  console.log("Received body:", req.body);
  console.log("Received file:", req.file);
  try {
    let { 
      player_name, height, reference, image, birthday, 
      place_of_birth, description, position, qualified, club_id 
    } = req.body;
    const player_image = req.file ? req.file.filename : null;

    // Ensure qualified is treated as a boolean (convert 0/1 to true/false)
    qualified = parseInt(req.body.qualified, 10);
    if (qualified !== 0 && qualified !== 1) {
      return res.status(400).json({ error: "Qualified must be 1 or 0" });
    }

    // Validate required fields
    if (!player_name || !position || !club_id) {
      return res.status(400).json({ error: "Missing required fields: player_name, position, club_id" });
    }

    const query = `
      INSERT INTO player (
        player_name, height, reference, image, birthday, 
        place_of_birth, description, position, qualified, club_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.promise().query(query, [
      player_name, height || null, reference || null, player_image || null, birthday || null, 
      place_of_birth || null, description || null, position, qualified, club_id
    ]);

    res.status(201).json({ message: "Player added successfully", player_id: result.insertId });
  } catch (error) {
    console.error("Error adding player:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//Modified:get a club detail
router.get('/club/:club_id', isAuth, isAutho([1,2,3]), async (req, res) => {
  try {
    const clubId = parseInt(req.params.club_id, 10);

    // Validate the clubId
    if (isNaN(clubId)) {
      return res.status(400).json({ error: "Invalid club ID" });
    }

    // Query to get club details along with player details
    const query = `
      SELECT c.club_id, c.club_name, c.club_picture, c.club_details, c.extra_details, 
             p.player_id, p.player_name, p.image
      FROM club c
      LEFT JOIN player p ON c.club_id = p.club_id
      WHERE c.club_id = ?
    `;
    const [rows] = await pool.promise().query(query, [clubId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Club not found or no players in the club" });
    }

    // Format response: Club details + array of players (id, name & image)
    const clubInfo = {
      club_id: rows[0].club_id,
      club_name: rows[0].club_name,
      club_picture: rows[0].club_picture,
      club_details: rows[0].club_details,
      extra_details: rows[0].extra_details,
      players: rows
        .filter(row => row.player_id) // Ensure we don't include null player entries
        .map(row => ({
          player_id: row.player_id,
          name: row.player_name,
          image: row.image || null  // Default to null if no image is available
        }))
    };

    res.json(clubInfo);
  } catch (error) {
    console.error("Error fetching club data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



//Modified:modify a club detail
router.put('/club/:club_id', isAuth, isAutho([1, 2]), async (req, res) => {
  try {
    const clubId = parseInt(req.params.club_id, 10);
    const { club_name, club_details, extra_details } = req.body; // Include extra_details in the request body

    // Validate the clubId
    if (isNaN(clubId)) {
      return res.status(400).json({ error: "Invalid club ID" });
    }

    // Validate the incoming data
    if (!club_name && !club_details && !extra_details) {
      return res.status(400).json({ error: "At least one field must be provided to update" });
    }

    // Construct the SQL query dynamically based on provided fields
    let updateFields = [];
    let values = [];

    if (club_name) {
      updateFields.push('club_name = ?');
      values.push(club_name);
    }
    if (club_details) {
      updateFields.push('club_details = ?');
      values.push(club_details);
    }
    if (extra_details) {
      updateFields.push('extra_details = ?');
      values.push(extra_details);
    }

    // Add the club_id to the values array (last element in the query)
    values.push(clubId);

    // Construct the final query
    const query = `
      UPDATE club
      SET ${updateFields.join(', ')}
      WHERE club_id = ?
    `;

    // Execute the query
    const [result] = await pool.promise().query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Club not found" });
    }

    res.json({ message: "Club details updated successfully" });
  } catch (error) {
    console.error("Error updating club details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete a club
router.delete('/club/:club_id',isAuth,isAutho([1,2]), async (req, res) => {
  try {
    const clubId = parseInt(req.params.club_id, 10);

    // Validate the club ID
    if (isNaN(clubId)) {
      return res.status(400).json({ error: "Invalid club ID" });
    }

    // Check if the club exists before deleting
    const [checkClub] = await pool.promise().query("SELECT * FROM club WHERE club_id = ?", [clubId]);

    if (checkClub.length === 0) {
      return res.status(404).json({ error: "Club not found" });
    }

    // Delete the club
    await pool.promise().query("DELETE FROM club WHERE club_id = ?", [clubId]);

    res.json({ message: "Club deleted successfully" });
  } catch (error) {
    console.error("Error deleting club:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//club names and pictures
router.get('/clubs/pic', isAuth, isAutho([1, 2, 3]), async (req, res) => {
  try {
    // Fetch all club names, pictures, and club_id
    const [rows] = await pool.promise().query("SELECT club_id, club_name, club_picture FROM club");

    if (rows.length === 0) {
      return res.status(404).json({ error: "No clubs found" });
    }

    // Extract and return the club_id, club names, and their pictures as an array
    const clubs = rows.map(row => ({
      club_id: row.club_id, // Include club_id in the response
      club_name: row.club_name,
      club_picture: row.club_picture
    }));

    res.json({ clubs });
  } catch (error) {
    console.error("Error fetching club names and pictures:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//Modified create a club
router.post('/club/post', isAuth, isAutho([1]), upload.single("club_picture"), async (req, res) => {
  const { club_name, club_details, extra_details, first_name, last_name } = req.body;
  const club_picture = req.file ? req.file.filename : null;

  if (!club_name || !first_name || !last_name) {
    return res.status(400).json({ error: "Missing required fields: club_name, first_name, last_name" });
  }

  try {
    const adminQuery = `SELECT admin_id FROM admin_account WHERE first_name = ? AND last_name = ?`;
    const [adminResult] = await pool.promise().query(adminQuery, [first_name, last_name]);

    if (adminResult.length === 0) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const club_admin_id = adminResult[0].admin_id;

    const query = `
      INSERT INTO club (club_name, club_picture, club_details, extra_details, club_admin_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await pool.promise().query(query, [club_name, club_picture, club_details, extra_details, club_admin_id]);

    res.status(201).json({ message: "Club added successfully", club_id: result.insertId });
  } catch (error) {
    console.error("Error adding club:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Post a qualification request according to the player name
router.post(
  "/qualification-request",
  isAuth,
  isAutho([1, 2]),
  pdfUpload.fields([
    { name: "extrait_de_naissance", maxCount: 1 },
    { name: "autorisation_parentale", maxCount: 1 },
    { name: "cin_scolaire", maxCount: 1 },
    { name: "photo", maxCount: 1 },
    { name: "extrait_de_payment", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { fullname, email, phone_number } = req.body;
      const files = req.files;

      // Debug: Log the received files
      console.log("Received files:", files);

      // Validate required fields
      if (
        !fullname ||
        !email ||
        !phone_number ||
        !files.extrait_de_naissance ||
        !files.autorisation_parentale ||
        !files.cin_scolaire ||
        !files.photo ||
        !files.extrait_de_payment
      ) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // Check if the fullname exists in the player table
      const [playerRows] = await pool
        .promise()
        .query("SELECT player_id FROM player WHERE player_name = ?", [fullname]);

      if (playerRows.length === 0) {
        return res.status(404).json({ error: "Player not found" });
      }

      const playerId = playerRows[0].player_id; // Get matched player ID

      // Normalize file paths (replace backslashes with forward slashes)
      const extraitDeNaissancePath = files.extrait_de_naissance[0].path.replace(/\\/g, "/");
      const autorisationParentalePath = files.autorisation_parentale[0].path.replace(/\\/g, "/");
      const cinScolairePath = files.cin_scolaire[0].path.replace(/\\/g, "/");
      const photoPath = files.photo[0].path.replace(/\\/g, "/");
      const extraitDePaymentPath = files.extrait_de_payment[0].path.replace(/\\/g, "/");

      // Debug: Log the normalized file paths
      console.log("Normalized file paths:", {
        extraitDeNaissancePath,
        autorisationParentalePath,
        cinScolairePath,
        photoPath,
        extraitDePaymentPath,
      });

      // Insert into qualification_request table
      const insertQuery = `
        INSERT INTO qualification_request (
          player_id, fullname, email, phone_number, 
          extrait_de_naissance, autorisation_parentale, cin_scolaire, photo, extrait_de_payment
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const [result] = await pool.promise().query(insertQuery, [
        playerId,
        fullname,
        email,
        phone_number,
        extraitDeNaissancePath,
        autorisationParentalePath,
        cinScolairePath,
        photoPath,
        extraitDePaymentPath,
      ]);

      res.status(201).json({
        message: "Qualification request submitted successfully",
        request_id: result.insertId,
      });
    } catch (error) {
      console.error("Error submitting qualification request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

//get all qualification requests and their details
router.get('/qualification-requests/retrieve',isAuth,isAutho([1]), async (req, res) => {
  try {
    const query = `
      SELECT qr.request_id, qr.fullname, qr.email, qr.phone_number, 
             qr.extrait_de_naissance, qr.autorisation_parentale, qr.cin_scolaire, 
             qr.photo, qr.extrait_de_payment, qr.status, qr.request_date, 
             p.player_name, p.club_id, c.club_name
      FROM qualification_request qr
      LEFT JOIN player p ON qr.player_id = p.player_id
      LEFT JOIN club c ON p.club_id = c.club_id
      ORDER BY qr.request_date DESC
    `;

    const [rows] = await pool.promise().query(query);

    if (rows.length === 0) {
      return res.status(404).json({ error: "No qualification requests found" });
    }

    res.json({ qualification_requests: rows });
  } catch (error) {
    console.error("Error fetching qualification requests:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//delete qualification request
router.delete('/qualification-request/:request_id',isAuth,isAutho([1]), async (req, res) => {
  try {
    const { request_id } = req.params;

    // Check if the request ID exists in the qualification_request table
    const [requestRows] = await pool.promise().query("SELECT * FROM qualification_request WHERE request_id = ?", [request_id]);

    if (requestRows.length === 0) {
      return res.status(404).json({ error: "Qualification request not found" });
    }

    // Delete the qualification request
    const deleteQuery = "DELETE FROM qualification_request WHERE request_id = ?";
    await pool.promise().query(deleteQuery, [request_id]);

    res.status(200).json({ message: "Qualification request deleted successfully" });
  } catch (error) {
    console.error("Error deleting qualification request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//change qualification request status
router.put('/qualification-request/:request_id/status',isAuth,isAutho([1]), async (req, res) => {
  try {
    const { request_id } = req.params;
    const { status } = req.body; // Status can only be "accepted" or "rejected"

    // Validate that the status is either "accepted" or "rejected"
    if (!status || !['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ error: "Status must be either 'accepted' or 'rejected'" });
    }

    // Check if the request ID exists in the qualification_request table
    const [requestRows] = await pool.promise().query("SELECT * FROM qualification_request WHERE request_id = ?", [request_id]);

    if (requestRows.length === 0) {
      return res.status(404).json({ error: "Qualification request not found" });
    }

    // Update the status of the qualification request
    const updateQuery = "UPDATE qualification_request SET status = ? WHERE request_id = ?";
    await pool.promise().query(updateQuery, [status, request_id]);

    res.status(200).json({ message: "Qualification request status updated successfully" });
  } catch (error) {
    console.error("Error updating qualification request status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//match




//register an admin
router.post('/register',isAuth,isAutho([1]), async (req, res) => {
  const { first_name, last_name, email, password, role_name } = req.body;

  // Validate input fields
  if (!first_name || !last_name || !email || !password || !role_name) {
      return res.status(400).json({ error: "All fields are required" });
  }

  try {
      // Check if the role exists
      const [roleResult] = await pool.promise().query("SELECT role_id FROM role WHERE role_name = ?", [role_name]);
      if (roleResult.length === 0) {
          return res.status(400).json({ error: "Invalid role" });
      }
      const role_id = roleResult[0].role_id;

      // Insert new admin account
      const query = `
          INSERT INTO admin_account (first_name, last_name, email, password_hash, role_id)
          VALUES (?, ?, ?, ?, ?)
      `;
      const [result] = await pool.promise().query(query, [first_name, last_name, email, password, role_id]);

      res.status(201).json({ message: "User registered successfully", admin_id: result.insertId });
  } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

//get admin
router.get('/admin',isAuth, async (req, res) => {
  try {
      const user = await getUserById(req.user.id);
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }
      console.log(user);
      res.json(user);
  } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete admin
router.delete('/admin/:admin_id',isAuth,isAutho([1]), async (req, res) => {
  const adminId = parseInt(req.params.admin_id, 10);

  // Validate adminId
  if (isNaN(adminId)) {
      return res.status(400).json({ error: "Invalid admin ID" });
  }

  try {
      // Check if the user exists before deleting
      const [checkUser] = await pool.promise().query("SELECT * FROM admin_account WHERE admin_id = ?", [adminId]);
      if (checkUser.length === 0) {
          return res.status(404).json({ error: "User not found" });
      }

      // Delete the user
      const [result] = await pool.promise().query("DELETE FROM admin_account WHERE admin_id = ?", [adminId]);

      res.json({ message: "User deleted successfully" });
  } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});


//login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await getUserByEmail(email);
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    if (password === admin.password_hash) {

      const token = jwt.sign(
        { id: admin.admin_id,
          role: admin.role_id
         },
        process.env.JWT_SECRET 
      );
      const {password_hash,...user} = admin;
      return res.status(200).json({ message: 'Logged in successfully', token, admin: user });
    } else {
      return res.status(401).json({ message: 'Invalid password' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function getUserByEmail(email) {
  const [result] = await pool.promise().query('SELECT * FROM admin_account WHERE email = ?', [email]);
  return result[0];
}

async function getUserById(id) {
  const [result] = await pool.promise().query('SELECT * FROM admin_account WHERE admin_id = ?', [id]);
  return result[0];
}



module.exports = router;