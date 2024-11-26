const express = require('express');
const mysql = require('mysql2');const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
// Kết nối đến MySQL
const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'password', // thay bằng mật khẩu MySQL của bạn
database: 'student_management',
});
db.connect(err => {
if (err) throw err;
console.log('Đã kết nối đến MySQL');
});
// API: Lấy danh sách sinh viên
app.get('/students', (req, res) => {
db.query('SELECT * FROM students', (err, results) => {
if (err) throw err;
res.json(results);
});
});
// API: Thêm sinh viên mới
app.post('/students', (req, res) => {
const { name, age, address, email } = req.body;
db.query(
'INSERT INTO students (name, age, address, email) VALUES (?, ?,
?, ?)',
[name, age, address, email],
(err, result) => {
if (err) throw err;
res.send('Sinh viên đã được thêm');
}
);
});
// API: Cập nhật thông tin sinh viên
app.put('/students/:id', (req, res) => {
const { id } = req.params;
const { name, age, address, email } = req.body;
db.query(
'UPDATE students SET name = ?, age = ?, address = ?, email = ?
WHERE id = ?',
[name, age, address, email, id],
(err, result) => {
if (err) throw err;
res.send('Thông tin sinh viên đã được cập nhật');
}
);
});
// API: Xóa sinh viên
app.delete('/students/:id', (req, res) => {
const { id } = req.params;
db.query('DELETE FROM students WHERE id = ?', [id], (err, result)
=> {
if (err) throw err;
res.send('Sinh viên đã được xóa');});
});
// Khởi động server
app.listen(5000, () => {
console.log('Server đang chạy trên cổng 5000');
});