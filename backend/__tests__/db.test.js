const { pool, connectDb } = require("../database/connectDB");
require("dotenv").config({ path: ".env.test" });

describe("Database Connection & Queries", () => {
  beforeAll(async () => {
    await connectDb();
  });

  afterAll(async () => {
    await pool.promise().end();
  });

  test("Should connect to the database", async () => {
    const connection = await pool.promise().getConnection();
    expect(connection).toBeDefined();
    connection.release();
  });

  test("Should create a test table", async () => {
    const query = `CREATE TABLE IF NOT EXISTS test_users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );`;
    await pool.promise().query(query);
    const [rows] = await pool.promise().query("SHOW TABLES LIKE 'test_users'");
    expect(rows.length).toBe(1);
  });

  test("Should insert a record into test_users", async () => {
    const query = "INSERT INTO test_users (name) VALUES (?)";
    const [result] = await pool.promise().query(query, ["John Doe"]);
    expect(result.affectedRows).toBe(1);
  });

  test("Should fetch the inserted record", async () => {
    const [rows] = await pool.promise().query("SELECT * FROM test_users WHERE name = ?", ["John Doe"]);
    expect(rows.length).toBe(1);
    expect(rows[0].name).toBe("John Doe");
  });

  test("Should delete test records", async () => {
    const query = "DELETE FROM test_users WHERE name = ?";
    const [result] = await pool.promise().query(query, ["John Doe"]);
    expect(result.affectedRows).toBe(1);
  });

  test("Should drop test table", async () => {
    await pool.promise().query("DROP TABLE IF EXISTS test_users");
    const [rows] = await pool.promise().query("SHOW TABLES LIKE 'test_users'");
    expect(rows.length).toBe(0);
  });
});
