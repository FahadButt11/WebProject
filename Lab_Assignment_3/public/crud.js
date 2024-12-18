$(document).ready(function() {
    // Mock data for semester-wise projects
    const semesterProjects = {
        1: [
            { name: "Project 1: Intro to Programming", summary: "Built basic console applications using Java." },
            { name: "Project 2: Web Basics", summary: "Created static web pages using HTML, CSS." }
        ],
        2: [
            { name: "Project 1: Database Management", summary: "Designed a relational database using MySQL." },
            { name: "Project 2: Data Structures", summary: "Implemented various data structures in Java." }
        ],
        3: [
            { name: "Project 1: Mobile App Development", summary: "Built a mobile app using Flutter." },
            { name: "Project 2: AI Basics", summary: "Implemented basic AI algorithms in Python." }
        ],
        4: [
            { name: "Project 1: Advanced Web Development", summary: "Developed a full-stack web app using React and Node.js." },
            { name: "Project 2: Data Science", summary: "Performed data analysis using Python libraries like Pandas." }
        ]
    };

    // Add event listener for the "View Projects" button
    $('.view-projects').on('click', function() {
        const semesterId = $(this).data('semester');
        const projectListDiv = $('#semester-' + semesterId + '-projects');

        // Clear the previous projects (if any)
        projectListDiv.html('');

        // Fetch the projects for the selected semester
        const projects = semesterProjects[semesterId];

        // Loop through the projects and add them to the DOM
        projects.forEach(project => {
            projectListDiv.append(
                `<div class="project">
                    <h6>${project.name}</h6>
                    <p>${project.summary}</p>
                </div>`
            );
        });

        // Toggle the project list visibility
        projectListDiv.slideToggle();
    });
});
