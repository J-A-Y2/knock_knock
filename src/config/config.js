import "dotenv/config";
import mysql from "mysql2";
const pool = mysql.createPool({
  host: process.env.DB_HOST, // MySQL 호스트
  user: process.env.DB_USER, // MySQL 사용자명
  password: process.env.DB_PW, // MySQL 비밀번호
  database: process.env.DB_NAME, // 사용할 데이터베이스
  port: process.env.DB_PORT,
});

// MySQL 연결
pool.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL 연결 실패:", err);
    return;
  }
  console.log("MySQL 연결 성공!");

  connection.release();
});

export { pool };
