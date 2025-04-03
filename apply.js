// Form submit
document.addEventListener("DOMContentLoaded", function() {

    emailjs.init("fe7oehXSN4bVGdPO4"); // Replace with your EmailJS Public Key
    const form = document.querySelector("form");
    // Get the query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    // Extract the value of 'ref' (recruiter ID)
    const referrer = urlParams.get('ref');


    document.getElementById('role').addEventListener('change', function() {
        var selectValue = this.value;
        var portfolioField = document.getElementById('portfolio');
        var portfolioLabel = document.getElementById('portfolioLabel');
      
        if (selectValue === 'Sales Representative' || selectValue === 'Human Resource Manager') {
            portfolioField.style.display = 'none';
            portfolioLabel.style.display = 'none';  
        } else {
            portfolioField.style.display = 'inline-block';
            portfolioLabel.style.display = 'inline';   
        }
    });
      
    
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const role = document.getElementById("role").value;
        const hours = document.getElementById("hours").value;
        const portfolio = document.getElementById("portfolio").value.trim();
        const cv = document.getElementById("cv").value.trim();
        const linkedin = document.getElementById("linkedin").value.trim();

        const message = `
        Referred by: ${referrer}\n
        Role: ${role}\n
        Weekly Hours Available: ${hours}\n
        Portfolio Link: ${portfolio}\n
        CV Link: ${cv}\n
        LinkedIn Link: ${linkedin}
        `;
        
        
        if (portfolio || cv || linkedin) {

            if (!validateEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }
    
    
            const templateParams = {
                title: "Application Request",
                name,
                email,
                message
            }
    
    
            // Send email
            emailjs.send("service_nqec55z", "template_nlureb4", templateParams)
            .then(function (response) {
                console.log("Success:", response);
            }, function (error) {
                console.log("Error:", error);
            });
    
    
            alert("Thank you for your Application submission! If your application is in line with what we are looking for, we will contact you to continue with the selection process. Otherwise, you will not receive further communications.");
            form.reset();

        } else {
            alert("Please provide any of these links.");
            return;
        }
        
        
    });
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
