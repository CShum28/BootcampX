var args = process.argv.slice(2);
const { Pool } = require("pg");

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "bootcampx",
});

const text =`
  SELECT students.id AS student_id, students.name AS name, cohorts.name AS cohort_name
  FROM students
  JOIN cohorts ON cohort_id = cohorts.id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `
const cohortName = args[0];
const limit = args[1] || 5;
const value = [`%${cohortName}%`, limit]

pool.query(text, value)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort_name} cohort`);
  })
})
.catch(err => console.error('query error', err.stack));