const arg = process.argv.slice(2);
const { Pool } = require("pg");

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "bootcampx",
});

pool.connect()
.then(console.log('connected'))

const text = `
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM cohorts
JOIN students ON cohorts.id = cohort_id
JOIN assistance_requests ON students.id = assistance_requests.student_id
JOIN teachers ON assistance_requests.teacher_id = teachers.id
WHERE cohorts.name LIKE $1
ORDER BY teacher;
`
const cohort_name = arg[0] || 'JUL02';
const value = [`%${cohort_name}%`]

pool.query(text, value)
.then(res => res.rows.forEach(user =>console.log(`${user.cohort}: ${user.teacher}`)))
.catch(err => console.error(`There is an error: ${err.stack}`))

