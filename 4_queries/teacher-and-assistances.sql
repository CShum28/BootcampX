SELECT teachers.name  AS teacher, cohorts.name  AS cohort, COUNT(assistance_requests.teacher_id) AS total_assistances 
FROM cohorts 
JOIN students ON cohorts.id = cohort_id
JOIN assistance_requests ON students.id = student_id
JOIN teachers ON teacher_id = teachers.id
WHERE cohorts.name = 'JUL02'
GROUP BY teachers.name, cohorts.name
ORDER BY teachers.name;