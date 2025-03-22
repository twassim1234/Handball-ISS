-- Use the database
CREATE DATABASE handball;
USE handball;

-- ================= ROLE TABLE =================
CREATE TABLE role (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name ENUM('federation_admin', 'club_admin', 'referee','DNA_Admin') UNIQUE
);
SELECT * FROM admin_account;
INSERT INTO role (role_name) 
VALUES 
  ('federation_admin'), 
  ('club_admin'), 
  ('referee'),
  ('DNA_Admin');

-- ================= ADMIN ACCOUNT TABLE =================
CREATE TABLE admin_account (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(role_id)
);

-- Insert Federation Admins and other roles (assuming hashed passwords)
INSERT INTO admin_account (first_name, last_name, email, password_hash, role_id) 
VALUES 
  ('Alice', 'Federation', 'alice.fed@example.com', 'hashed_password_1', 1), 
  ('Bob', 'ClubAdmin', 'bob.clubadmin@example.com', 'hashed_password_2', 2), 
  ('Charlie', 'Referee', 'charlie.ref@example.com', 'hashed_password_3', 3);

-- ================= CLUB TABLE =================
CREATE TABLE club (
    club_id INT AUTO_INCREMENT PRIMARY KEY,
    club_name VARCHAR(100) NOT NULL UNIQUE,
    club_picture VARCHAR(255), -- URL or file path to the club’s image
    club_details TEXT, -- General description of the club
    extra_details TEXT, -- Additional club information
    club_admin_id INT,
    FOREIGN KEY (club_admin_id) REFERENCES admin_account(admin_id) ON DELETE SET NULL
);
select * from club;
-- Separate table for club highlights
CREATE TABLE club_highlight (
    highlight_id INT AUTO_INCREMENT PRIMARY KEY,
    club_id INT NOT NULL,
    highlight_text VARCHAR(255) NOT NULL,
    FOREIGN KEY (club_id) REFERENCES club(club_id) ON DELETE CASCADE
);
UPDATE club 
SET club_picture = 'https://upload.wikimedia.org/wikipedia/fr/3/34/CA_Bizertin_Old.png' 
WHERE club_name = 'Handball Club B';

-- Insert Clubs
INSERT INTO club (club_name, club_picture, club_details, extra_details, club_admin_id) 
VALUES 
  ('Handball Club A', 'images/clubA.jpg', 'A top-tier handball club', 'Has won multiple championships', 2);

-- Insert Highlights for Clubs
INSERT INTO club_highlight (club_id, highlight_text) 
VALUES 
  (1, 'National Champions 2023'),
  (1, 'Best Youth Academy'),
  (2, 'Rapidly growing fan base'),
  (2, 'State-of-the-art training facilities');

-- ================= PLAYER TABLE =================
CREATE TABLE player (
    player_id INT AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(100) NOT NULL,
    height INT, -- Height in cm (or appropriate unit)
    reference VARCHAR(255), -- External identifier or scouting reference
    image VARCHAR(255), -- URL or file path for player's photo
    birthday DATE, -- Date of birth
    place_of_birth VARCHAR(100), -- City or country of birth
    description TEXT, -- Additional player details
    position ENUM('Goalkeeper', 'Left Wing', 'Right Wing', 'Left Back', 'Right Back', 'Center Back', 'Pivot') NOT NULL,
    qualified BOOLEAN DEFAULT TRUE,
    club_id INT NOT NULL,
    FOREIGN KEY (club_id) REFERENCES club(club_id) ON DELETE CASCADE
);
select * from club;
select * from player;
-- Separate table for player highlights
CREATE TABLE player_highlight (
    highlight_id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT NOT NULL,
    highlight_text VARCHAR(255) NOT NULL,
    FOREIGN KEY (player_id) REFERENCES player(player_id) ON DELETE CASCADE
);

-- Insert Players into Clubs
INSERT INTO player (player_name, height, reference, image, birthday, place_of_birth, description, position, qualified, club_id) 
VALUES 
  ('John Doe', 185, 'JD123', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Khalil_Chemmam.jpg/1024px-Khalil_Chemmam.jpg', '1998-05-12', 'Los Angeles, USA', 'A talented goalkeeper', 'Goalkeeper', TRUE, 10),
  ('Jane Smith', 175, 'JS567', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Khalil_Chemmam.jpg/1024px-Khalil_Chemmam.jpg', '2000-08-23', 'Paris, France', 'A quick and agile left-wing', 'Left Wing', TRUE, 10),
  ('Michael Johnson', 188, 'MJ890', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Khalil_Chemmam.jpg/1024px-Khalil_Chemmam.jpg', '1995-02-10', 'Berlin, Germany', 'A strong center-back', 'Center Back', TRUE, 10);

-- Insert Highlights for Players
INSERT INTO player_highlight (player_id, highlight_text) 
VALUES 
  (1, 'High quality'),
  (1, 'Comfortable fit'),
  (1, 'Stylish design'),
  (2, 'Top scorer of 2023'),
  (3, 'Strong defensive skills');

-- ================= MATCH TABLE =================
CREATE TABLE handball_match (
    match_id INT AUTO_INCREMENT PRIMARY KEY,
    match_date DATETIME NOT NULL,
    match_location VARCHAR(100) NOT NULL,
    referee_id INT,
    FOREIGN KEY (referee_id) REFERENCES admin_account(admin_id) ON DELETE SET NULL
);

-- Insert Handball Matches
INSERT INTO handball_match (match_date, match_location, referee_id) 
VALUES 
  ('2025-03-10 18:00:00', 'Stadium A', 3),
  ('2025-03-12 20:00:00', 'Stadium B', 3);

-- ================= PLAYED MATCH TABLE =================
CREATE TABLE played_match (
    match_id INT NOT NULL,
    club_id INT NOT NULL,
    PRIMARY KEY (match_id, club_id),
    FOREIGN KEY (match_id) REFERENCES handball_match(match_id) ON DELETE CASCADE,
    FOREIGN KEY (club_id) REFERENCES club(club_id) ON DELETE CASCADE
);

-- Record Played Matches
INSERT INTO played_match (match_id, club_id) 
VALUES 
  (1, 1),
  (1, 2),
  (2, 1),
  (2, 2);

-- ================= PERMISSION TABLE =================
CREATE TABLE permission (
    permission_id INT AUTO_INCREMENT PRIMARY KEY,
    permission_name VARCHAR(100) UNIQUE NOT NULL
);

-- Insert Permissions
INSERT INTO permission (permission_name) 
VALUES 
  ('manage_clubs'), 
  ('schedule_matches'), 
  ('referee_matches');

-- ================= ROLE PERMISSION TABLE =================
CREATE TABLE role_permission (
    role_id INT NOT NULL,
    permission_id INT NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES role(role_id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permission(permission_id) ON DELETE CASCADE
);

-- Assign Permissions to Roles
INSERT INTO role_permission (role_id, permission_id) 
VALUES 
  (1, 1), -- Federation Admin can manage clubs
  (1, 2), -- Federation Admin can schedule matches
  (2, 1), -- Club Admin can manage clubs
  (3, 3); -- Referee can referee matches
CREATE TABLE qualification_request (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT NOT NULL,
    status ENUM('Accepted', 'Rejected') DEFAULT NULL,
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fullname VARCHAR(100) NOT NULL, 
    email VARCHAR(100) NOT NULL, 
    phone_number VARCHAR(20) NOT NULL, 
    extrait_de_naissance VARCHAR(255), -- File path
    autorisation_parentale VARCHAR(255), -- File path
    cin_scolaire VARCHAR(255), -- File path
    photo VARCHAR(255), -- File path
    extrait_de_payment VARCHAR(255), -- File path
    
    FOREIGN KEY (player_id) REFERENCES player(player_id) ON DELETE CASCADE
);
select * from qualification_request;



INSERT INTO qualification_request (
    player_id, fullname, email, phone_number, 
    extrait_de_naissance, autorisation_parentale, cin_scolaire, photo, extrait_de_payment, 
    status, request_date
)
SELECT 
    p.player_id, 'John Doe', 'john.doe@example.com', '1234567890',
    NULL, NULL, NULL, NULL, NULL,  -- Use NULL or actual file data
    NULL, NOW()
FROM player p
WHERE p.player_name = 'John Doe';
select * from qualification_request;

ALTER TABLE handball_match
ADD COLUMN competition_name VARCHAR(100),
ADD COLUMN match_status ENUM('Scheduled', 'Ongoing', 'Finished') DEFAULT 'Scheduled',
ADD COLUMN match_duration INT, -- Total minutes
ADD COLUMN spectators_count INT;




-- ================= MATCH TEAM STATS TABLE =================
CREATE TABLE match_team_stats (
    match_id INT NOT NULL,
    club_id INT NOT NULL,
    first_half_score INT DEFAULT 0,
    second_half_score INT DEFAULT 0,
    extra_time_score INT DEFAULT 0,
    penalty_shootout_score INT DEFAULT 0,
    total_goals INT DEFAULT 0,
    total_fouls INT DEFAULT 0,
    timeouts_used INT DEFAULT 0,
    PRIMARY KEY (match_id, club_id),
    FOREIGN KEY (match_id) REFERENCES handball_match(match_id) ON DELETE CASCADE,
    FOREIGN KEY (club_id) REFERENCES club(club_id) ON DELETE CASCADE
);

-- ================= MATCH PLAYER PERFORMANCE TABLE =================
CREATE TABLE match_player_performance (
    match_id INT NOT NULL,
    player_id INT NOT NULL,
    goals_scored INT DEFAULT 0,
    assists INT DEFAULT 0,
    yellow_cards INT DEFAULT 0,
    red_cards INT DEFAULT 0,
    two_minute_suspensions INT DEFAULT 0,
    fouls_committed INT DEFAULT 0,
    saves INT DEFAULT 0, 
    PRIMARY KEY (match_id, player_id),
    FOREIGN KEY (match_id) REFERENCES handball_match(match_id) ON DELETE CASCADE,
    FOREIGN KEY (player_id) REFERENCES player(player_id) ON DELETE CASCADE
);

-- ================= MATCH REFEREES TABLE =================
CREATE TABLE match_referees (
    match_id INT NOT NULL,
    referee_id INT NOT NULL,
    signature VARCHAR(255), -- Digital signature file path
    PRIMARY KEY (match_id, referee_id),
    FOREIGN KEY (match_id) REFERENCES handball_match(match_id) ON DELETE CASCADE,
    FOREIGN KEY (referee_id) REFERENCES admin_account(admin_id) ON DELETE CASCADE
);

-- ================= MATCH NOTES TABLE =================
CREATE TABLE match_notes (
    match_id INT NOT NULL,
    note_id INT AUTO_INCREMENT PRIMARY KEY,
    note_text TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (match_id) REFERENCES handball_match(match_id) ON DELETE CASCADE
);
INSERT INTO club (club_name, club_picture, club_details, extra_details, club_admin_id) 
VALUES 
 
  ('Handball Club C', 'images/clubC.png', 'An emerging handball club', 'Has a strong youth program', 2);
