// Available Courses
const availableCourses = ["HTML Basics", "CSS Fundamentals", "JavaScript Essentials"];

// Window Load - Check Auth
window.onload = function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // Redirect if not logged in
    if (window.location.pathname.includes("dashboard.html") && isLoggedIn !== "true") {
        alert("Please log in first!");
        window.location.href = "login.html";
    }

    // Show available & enrolled courses on dashboard
    if (window.location.pathname.includes("dashboard.html")) {
        showAvailableCourses();
        displayEnrolledCourses();
    }
};

function signupUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password) {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);
      localStorage.setItem("isLoggedIn", "true");


      alert("Sign Up Successful! Redirecting to Dashboard...");
      window.location.href = "dashaborde.html"; 
  } else {
      alert("Please fill in all fields!");
  }
}


// Login User
function loginUser() {
    const loginEmail = document.getElementById("email").value; // Get email input
    const loginPassword = document.getElementById("password").value; // Get password input

    // Retrieve stored credentials
    const storedEmail = localStorage.getItem("userEmail"); 
    const storedPassword = localStorage.getItem("userPassword"); 

    // Validate credentials
    if (loginEmail === storedEmail && loginPassword === storedPassword) {
        localStorage.setItem("isLoggedIn", "true"); 
        alert("Login Successful! Redirecting to Dashboard..."); 
        window.location.href = "dashaborde.html"; 
    } else {
        alert("Invalid email or password. Please try again!"); // Error message
    }
}



// Open Admin Panel from Dashboard
function openAdminPanel() {
  window.location.assign("Adamin.html");

}

function enrollStudent() {
    const name = document.getElementById('studentName').value;
    const surname = document.getElementById('studentSurname').value;
    const email = document.getElementById('studentEmail').value;
    const password = document.getElementById('studentPassword').value;

    // Get selected courses
    let selectedCourses = [];
    let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    
    checkboxes.forEach((checkbox) => {
        selectedCourses.push(checkbox.value);
    });

    // Validation check
    if (selectedCourses.length === 0) {
        alert("Please select at least one course.");
        return false;
    }

    // Add student details to the list
    const studentList = document.getElementById('studentList');
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <strong>Name:</strong> ${name} ${surname}<br>
        <strong>Email:</strong> ${email}<br>
        <strong>Courses:</strong> ${selectedCourses.join(', ')}
    `;
    studentList.appendChild(listItem);

    // Clear form after submission
    document.getElementById('enrollForm').reset();
    return false; // Prevent page reload
}

// Logout User
function logout() {
    localStorage.removeItem("isLoggedIn"); // User ko logout karne ke liye session clear karo
    alert("You have been logged out!"); // Logout confirmation
    window.location.href = "login.html"; // Login page par redirect karo
}



// Store enrolled students
const students = JSON.parse(localStorage.getItem("students")) || [];

function enrollStudent() {
    const name = document.getElementById("studentName").value.trim();
    const surname = document.getElementById("studentSurname").value.trim();
    const email = document.getElementById("studentEmail").value.trim();
    const password = document.getElementById("studentPassword").value.trim();
    const selectedCourses = Array.from(document.getElementById("courseSelect").selectedOptions).map(option => option.value);

    // Validation rules
    if (!email || !password || password.length < 8) {
        alert("Please provide a valid email and password (8 characters minimum).");
        return false;
    }

    if (selectedCourses.length < 1 || selectedCourses.length > 2) {
        alert("You must select 1 or 2 courses only.");
        return false;
    }

    // Check if email is already registered
    const existingStudent = students.find(student => student.email === email);
    if (existingStudent) {
        alert("This email is already registered!");
        return false;
    }

    // Add student data
    const newStudent = { name, surname, email, password, courses: selectedCourses };
    students.push(newStudent);
    localStorage.setItem("students", JSON.stringify(students));
    alert(`${name} ${surname} has been registered successfully!`);
    updateStudentList();
    return false; // Prevent form submission
}

// Update Registered Students List
function updateStudentList() {
    const studentList = document.getElementById("studentList");
    studentList.innerHTML = ""; 

    students.forEach(student => {
        const li = document.createElement("li");
        li.textContent = `${student.name} ${student.surname} - ${student.courses.join(", ")}`;
        studentList.appendChild(li);
    });
}

// Initialize the list on page load
window.onload = updateStudentList;


// Redirect to Dashboard
function joinUser() {
    window.location.href = "dashboard.html"; // Navigate to dashboard.html
}

// Enroll Student Function
function enrollStudent() {
    const email = document.getElementById("studentEmail").value;
    const course = document.getElementById("courseSelect").value;

    if (email) {
        alert(`${email} has been enrolled in ${course}!`);
    } else {
        alert("Please enter a valid email.");
    }
}

// Redirect to courses.html when Join button is clicked
function joinUser() {
    window.location.href = "courses.html"; 
}

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Open Study Materials for Selected Course
const studyMaterials = {
    "Core Java": [
        { type: "📄 Notes", title: "Core Java Notes", link: "https://www.greenstechnologys.com/Core-java-material.pdf" },
        { type: "📹 Video", title: "Java Basics Video", link: "https://youtu.be/eIrMbAQSU34?si=OK72qkYReYXTxPOD" }
    ],
    "Java 8 Features": [
        { type: "📄 Notes", title: "Java 8 Features Guide", link: "https://example.com/Java_8_Features.pdf" },
        { type: "📹 Video", title: "Lambda Expressions Video", link: "https://www.youtube.com/watch?v=1OpAgZvYXLQ" }
    ],
    "Node.js Crash Course": [
        { type: "📄 Notes", title: "Node.js Crash Course", link: "https://www.anuragkapur.com/assets/blog/programming/node/PDF-Guide-Node-Andrew-Mead-v3.pdf" },
        { type: "📹 Video", title: "Full Crash Course", link: "https://youtu.be/32M1al-Y6Ag?si=bTqKXT7uJrB7m8k9" }
    ],
    "PHP for Beginners": [
        { type: "📄 Notes", title: "PHP for Beginners", link: "https://example.com/PHP_for_Beginners.pdf" },
        { type: "📹 Video", title: "PHP Programming Language", link: "https://mkakouris.sites.sch.gr/wp-content/uploads/2020/08/Php_Tutorials.pdf" }
    ]
};

function openMaterials(courseName) {
    const materialsList = document.getElementById("materialsList");
    const courseTitle = document.getElementById("courseTitle");
    const studyMaterialsDiv = document.getElementById("studyMaterials");

    courseTitle.innerText = `Study Materials for ${courseName}`;
    materialsList.innerHTML = "";

    studyMaterials[courseName].forEach(material => {
        const li = document.createElement("li");
        li.innerHTML = `${material.type} <a href="${material.link}" target="_blank">${material.title}</a>`;
        materialsList.appendChild(li);
    });

    studyMaterialsDiv.style.display = "block";
}
