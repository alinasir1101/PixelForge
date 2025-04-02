
// Form submit
document.addEventListener("DOMContentLoaded", function() {

    emailjs.init("fe7oehXSN4bVGdPO4"); // Replace with your EmailJS Public Key
    const form = document.querySelector("form");
    
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const company = document.getElementById("company").value.trim();
        const projectType = document.getElementById("project-type").value.trim();
        const budget = document.getElementById("budget").value.trim();
        const deadline = document.getElementById("deadline").value.trim();
        const description = document.getElementById("description").value.trim();

        const message = `
        Company Name: ${company}\n
        Project Type: ${projectType}\n
        Budget: ${budget}\n
        Deadline (yyyy-mm-dd): ${deadline}\n
        Description: ${description}
        `;
        
        
        if (name === "" || email === "" || description === "") {
            alert("Please fill in all fields.");
            return;
        }
        
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }


        const templateParams = {
            title: "Project Request",
            name,
            email,
            message
        }


        // Send email
        emailjs.send("service_qisnzse", "template_kk1cshl", templateParams)
        .then(function (response) {
            console.log("Success:", response);
        }, function (error) {
            console.log("Error:", error);
        });


        
        alert("Thank you for your project request submission! We will get back to you soon.");
        form.reset();
    });
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});






// # in URL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default jump
        const targetID = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetID);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });

            // Remove hash from URL after scrolling
            setTimeout(() => {
                history.pushState(null, "", window.location.pathname);
            }, 100); // Delay to ensure scrolling is done
        }
    });
});







