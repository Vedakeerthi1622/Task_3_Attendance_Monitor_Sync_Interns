<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Attendance Monitoring System</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <div class="container">
        <h1>Attendance Monitoring System</h1>
        <form id="studentForm">
            <label for="studentId">Student ID:</label>
            <input type="text" id="studentId" required>
            <label for="studentName">Student Name:</label>
            <input type="text" id="studentName" required>
            <button type="submit">Register Student</button>
        </form>
        <div id="attendanceSection">
            <h2>Attendance</h2>
            <div id="attendanceList">
                <!-- Attendance records will be dynamically added here -->
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>

</html>




@import url('https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap');

body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f0e8c9;
    /* Pastel yellow */
}

.container {
    max-width: 800px;
    margin: 30px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    /* White */
}

h1 {
    text-align: center;
    color: #512da8;
    /* Dark purple */
    margin-bottom: 20px;
}

form {
    display: flex;
    flex-direction: column;
}

form label {
    margin-bottom: 5px;
    color: #512da8;
    /* Dark purple */
}

form input {
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

form button {
    padding: 10px 20px;
    background-color: #388e3c;
    /* Dark green */
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    align-self: center;
    transition: background-color 0.2s;
}

form button:hover {
    background-color: #2e7d32;
    /* Dark green on hover */
}

#attendanceSection {
    margin-top: 30px;
}

#attendanceSection h2 {
    text-align: center;
    color: #512da8;
    /* Dark purple */
    margin-bottom: 10px;
}

.attendance-entry {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #e1bee7;
    /* Light purple */
}

.attendance-entry h3 {
    margin: 0;
    color: #512da8;
    /* Dark purple */
}

.attendance-entry p {
    color: #388e3c;
    /* Dark green */
    margin: 5px 0;
}

.attendance-entry p:last-child {
    font-weight: bold;
}



const studentForm = document.getElementById('studentForm');
const attendanceList = document.getElementById('attendanceList');

// Function to create a new student entry in the attendance list
function createStudentEntry(student) {
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('attendance-entry');
    entryDiv.setAttribute('data-student-id', student.id); // Add data-student-id attribute

    const nameHeading = document.createElement('h3');
    nameHeading.textContent = `${student.name} (ID: ${student.id})`; // Display name and ID

    const attendanceDetails = document.createElement('p');
    const attendance = Object.keys(student.attendance);
    attendanceDetails.textContent = `Attendance: ${attendance.join(', ')}`;

    // Calculate attendance percentage
    const totalDays = Object.keys(student.attendance).length;
    const attendancePercentage = (totalDays / 30) * 100;
    const attendancePercentageRounded = Math.round(attendancePercentage * 10) / 10;

    const attendancePercentageElement = document.createElement('p');
    attendancePercentageElement.textContent = `Attendance Percentage: ${attendancePercentageRounded}%`;

    entryDiv.appendChild(nameHeading);
    entryDiv.appendChild(attendanceDetails);
    entryDiv.appendChild(attendancePercentageElement);

    attendanceList.appendChild(entryDiv);
}

// Function to add a new attendance record to the attendance list
function addAttendanceRecord(studentId, date) {
    const studentEntry = attendanceList.querySelector(`[data-student-id="${studentId}"]`);
    if (studentEntry) {
        const attendanceDetails = studentEntry.querySelector('p');
        const attendance = attendanceDetails.textContent.split(', ');
        attendance.push(date);
        attendanceDetails.textContent = `Attendance: ${attendance.join(', ')}`;

        // Calculate and update attendance percentage
        const totalDays = attendance.length;
        const attendancePercentage = (totalDays / 30) * 100;
        const attendancePercentageRounded = Math.round(attendancePercentage * 10) / 10;

        const attendancePercentageElement = studentEntry.querySelector('p:last-child');
        attendancePercentageElement.textContent = `Attendance Percentage: ${attendancePercentageRounded}%`;
    }
}

// Event listener for student registration form submission
studentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const studentId = document.getElementById('studentId').value;
    const studentName = document.getElementById('studentName').value;

    // Mock API call to add a new student
    const newStudent = {
        id: studentId,
        name: studentName,
        attendance: {},
    };

    createStudentEntry(newStudent);
    studentForm.reset();
});

// Mock API call to fetch all students' data
const students = [{
        id: "16",
        name: "Vedakeerthi",
        attendance: {
            "2023-07-01": true,
            "2023-07-02": true,
            "2023-07-03": true,
            // ... Add more attendance data here ...
        },
    },
    // Add more students' data here if needed
];

students.forEach((student) => {
    createStudentEntry(student);
});

// Function to mark attendance for a student on button click (mock API call)
function markAttendance(studentId) {
    const date = new Date().toISOString().split("T")[0]; // Get the current date in YYYY-MM-DD format
    // Mock API call to mark attendance
    students.forEach((student) => {
        if (student.id === studentId) {
            student.attendance[date] = true;
        }
    });
    addAttendanceRecord(studentId, date);
}

// Event delegation for marking attendance on button click
attendanceList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'BUTTON') {
        const studentEntry = target.closest('.attendance-entry');
        if (studentEntry) {
            const studentId = studentEntry.getAttribute('data-student-id');
            markAttendance(studentId);
        }
    }
});
