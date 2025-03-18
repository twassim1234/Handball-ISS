const express = require('express');
const { pool, connectDb } = require('./database/connectDB'); // Import pool and connectDb
const jwt = require('jsonwebtoken');
require('dotenv').config();
const isAuth = require('./isAuth');
const isAutho = require('./isAutho');

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
router.put('/player/:id',isAuth,isAutho([1,2]), async (req, res) => {
  try {
    const playerId = parseInt(req.params.id, 10);
    const { player_name, nationality, position, qualified, club_id } = req.body; 

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
    if (nationality) {
      fieldsToUpdate.push("nationality = ?");
      values.push(nationality);
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
router.delete('/player/:id',isAuth, isAutho([1,2]), async (req, res) => {
  try {
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

//add a new player
router.post('/player',isAuth,isAutho([1,2]), async (req, res) => {
  try {
    let { 
      player_name, height, reference, image, birthday, 
      place_of_birth, description, position, qualified, club_id 
    } = req.body;

    // Ensure qualified is treated as a boolean (convert 0/1 to true/false)
    if (qualified === 0) {
      qualified = false;
    } else if (qualified === 1) {
      qualified = true;
    } else {
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
      player_name, height || null, reference || null, image || null, birthday || null, 
      place_of_birth || null, description || null, position, qualified, club_id
    ]);

    res.status(201).json({ message: "Player added successfully", player_id: result.insertId });
  } catch (error) {
    console.error("Error adding player:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//get a club detail
router.get('/club/:club_id',isAuth,isAutho([1,2,3]), async (req, res) => {
  try {
    const clubId = parseInt(req.params.club_id, 10);

    // Validate the clubId
    if (isNaN(clubId)) {
      return res.status(400).json({ error: "Invalid club ID" });
    }

    // Query to get all information about the club, its players' names, and the club's details
    const query = `
      SELECT c.club_id, c.club_name, c.club_picture, c.club_details, c.extra_details, p.player_name
      FROM club c
      LEFT JOIN player p ON c.club_id = p.club_id
      WHERE c.club_id = ?
    `;
    const [rows] = await pool.promise().query(query, [clubId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Club not found or no players in the club" });
    }

    // Format response: Club details + array of player names
    const clubInfo = {
      club_id: rows[0].club_id,
      club_name: rows[0].club_name,
      club_picture: rows[0].club_picture,
      club_details: rows[0].club_details,
      extra_details: rows[0].extra_details,
      players: rows.map(row => row.player_name).filter(Boolean) // Only include player names, filter out nulls
    };

    res.json(clubInfo);
  } catch (error) {
    console.error("Error fetching club data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//modify a club detail
router.put('/club/:club_id',isAuth,isAutho([1,2]), async (req, res) => {
  try {
    const clubId = parseInt(req.params.club_id, 10);
    const { club_name } = req.body; // Example fields you want to update

    // Validate the clubId
    if (isNaN(clubId)) {
      return res.status(400).json({ error: "Invalid club ID" });
    }

    // Validate the incoming data
    if (!club_name) {
      return res.status(400).json({ error: "At least one field must be provided to update" });
    }

    // Construct the SQL query dynamically based on provided fields
    let updateFields = [];
    let values = [];

    if (club_name) {
      updateFields.push('club_name = ?');
      values.push(club_name);
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
router.get('/clubs/pic',isAuth,isAutho([1,2,3]), async (req, res) => {
  try {
    // Fetch all club names and pictures
    const [rows] = await pool.promise().query("SELECT club_name, club_picture FROM club");

    if (rows.length === 0) {
      return res.status(404).json({ error: "No clubs found" });
    }

    // Extract and return the club names and their pictures as an array
    const clubs = rows.map(row => ({
      club_name: row.club_name,
      club_picture: row.club_picture
    }));

    res.json({ clubs });
  } catch (error) {
    console.error("Error fetching club names and pictures:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//create a club
router.post('/club/post',isAuth,isAutho([1]), async (req, res) => {
  const { club_name, club_picture, club_details, extra_details, club_admin_id } = req.body;

  // Validate required fields
  if (!club_name || !club_admin_id) {
    return res.status(400).json({ error: "Missing required fields: club_name, club_admin_id" });
  }

  try {
    // Insert the new club into the database
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
router.post('/qualification-request',isAuth,isAutho([1,2]), async (req, res) => {
  try {
    const { fullname, email, phone_number, extrait_de_naissance, autorisation_parentale, cin_scolaire, photo, extrait_de_payment } = req.body;

    // Validate required fields
    if (!fullname || !email || !phone_number || !extrait_de_naissance || !autorisation_parentale || !cin_scolaire || !photo || !extrait_de_payment) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the fullname exists in the player table
    const [playerRows] = await pool.promise().query("SELECT player_id FROM player WHERE player_name = ?", [fullname]);

    if (playerRows.length === 0) {
      return res.status(404).json({ error: "Player not found" });
    }

    const playerId = playerRows[0].player_id; // Get matched player ID

    // Insert into qualification_request table
    const insertQuery = `
      INSERT INTO qualification_request (
        player_id, fullname, email, phone_number, 
        extrait_de_naissance, autorisation_parentale, cin_scolaire, photo, extrait_de_payment
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.promise().query(insertQuery, [
      playerId, fullname, email, phone_number, 
      extrait_de_naissance, autorisation_parentale, cin_scolaire, photo, extrait_de_payment// Assume terms are accepted
    ]);

    res.status(201).json({ message: "Qualification request submitted successfully", request_id: result.insertId });
  } catch (error) {
    console.error("Error submitting qualification request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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



module.exports = router;