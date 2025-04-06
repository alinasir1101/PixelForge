
// Form submit
document.addEventListener("DOMContentLoaded", function() {

    emailjs.init("fe7oehXSN4bVGdPO4"); // Replace with your EmailJS Public Key
    const form = document.querySelector("form");

    // Get the query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    // Extract the value of 'ref' (recruiter ID)
    const referrer = urlParams.get('ref');


    document.getElementById('medium').addEventListener('change', function() {
        var selectValue = this.value;
        var discordField = document.getElementById('discordUsername');
        var discordLabel = document.getElementById('discordLabel');
      
        if (selectValue === 'Discord') {
            discordField.style.display = 'inline-block';
            discordField.required = true;
            discordLabel.style.display = 'block';  
        } else {
            discordField.style.display = 'none';
            discordField.required = false;
            discordLabel.style.display = 'none';   
        }
    });




    
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const medium = document.getElementById("medium").value;
        const discordUsername = document.getElementById("discordUsername").value.trim();
        var method;

        if (medium == "Discord") {
            method = `${medium}\n\nDiscord Username: ${discordUsername}`;
        } else {
            method = medium;
        }

        const company = document.getElementById("company").value.trim();

        const selectedTypes = Array.from(document.querySelectorAll('input[name="projectOptions"]:checked')).map(input => input.value);
        if (selectedTypes.length === 0) {
            alert("Please select at least one project type.");
            return;
        }

        // const projectType = document.getElementById("project-type").value.trim();
        const budget = document.getElementById("budget").value.trim();
        const deadline = document.getElementById("deadline").value.trim();
        const description = document.getElementById("description").value.trim();
        const target = document.getElementById("target").value.trim();

        const message = `
        Preferred Communication Method: ${method}\n
        Company Name: ${company}\n
        Referred by: ${referrer}\n
        Project Type: ${selectedTypes.join(", ")}\n
        Budget: ${budget}\n
        Deadline (yyyy-mm-dd): ${deadline}\n
        Description and Goals: ${description}\n
        Target Audience or Customer: ${target}
        `;
        
        
        // if (name === "" || email === "" || description === "") {
        //     alert("Please fill in all fields.");
        //     return;
        // }
        
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









// Slider

const imageUrls = [];
for (let i = 1; i <= 20; i++) {
  imageUrls.push(`Assets/Portfolios/p${i}.png`);
}

const sliderTrack = document.getElementById("slider-track");

// Duplicate images for seamless infinite effect
const allImages = [...imageUrls, ...imageUrls];
allImages.forEach(src => {
  const img = document.createElement("img");
  img.src = src;
  sliderTrack.appendChild(img);
});

// Wait for images to load, then calculate animation duration
window.addEventListener("load", () => {
  const totalWidth = sliderTrack.scrollWidth / 2;
  const speed = 100; // pixels per second
  const duration = totalWidth / speed;

  sliderTrack.style.animationDuration = `${duration}s`;
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







