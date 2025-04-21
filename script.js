
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


    const checkboxes = [
        // { checkboxId: 'Logo/BrandDesign', divId: 'logo-questions' },
        // { checkboxId: 'Print/MarketingDesign', divId: 'print/marketing-questions' },
        { checkboxId: 'UI/UXDesign', divId: 'UI/UX-questions' },
        { checkboxId: 'WebDevelopment', divId: 'web-questions' },
        { checkboxId: 'MobileDevelopment', divId: 'mobile-questions' },
        { checkboxId: 'Backend/APIDevelopment', divId: 'backend-questions' }
    ];
  
    let servicesList = [];
    checkboxes.forEach(item => {
        const checkbox = document.getElementById(item.checkboxId);
        const div = document.getElementById(item.divId);
  
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                div.style.display = 'block';
                servicesList.push(checkbox.id);
            } else {
                div.style.display = 'none';
                const index = servicesList.indexOf(checkbox.id);
                if (index !== -1) {
                    servicesList.splice(index, 1);
                }
            }
            
        });
    });




    
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        console.log(servicesList);
        
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


        //Service Questions
        let services ="";

        if (servicesList.includes('Logo/BrandDesign')) {
            const mission = document.getElementById("mission");
            const brand_guidelines = document.getElementById("brand_guidelines");
            const logo_type = document.getElementById("logo_type");
            const industry_description = document.getElementById("industry_description");
            const logo_inspiration = document.getElementById("logo_inspiration");
            const brand_message = document.getElementById("brand_message");

            services += `
            LOGO/BRAND DESIGN\n
            Q: What is your brand's mission and vision?\r\nA: ${mission.value}\n
            Q: Do you have any existing brand guidelines or color schemes?\r\nA: ${brand_guidelines.value}\n
            Q: Which Logo type do you prefer?\r\nA: ${logo_type.value}\n
            Q: Which industry do you work in? What does your company do?\r\nA: ${industry_description.value}\n
            Q: Any logo inspirations?\r\nA: ${logo_inspiration.value}\n
            Q: What feeling or message should your brand convey?\r\nA: ${brand_message.value}\n
            `;
        }
        if (servicesList.includes('Print/MarketingDesign')) {
            const marketing_materials = document.getElementById("marketing_materials");
            const marketing_preferences = document.getElementById("marketing_preferences");
            const marketing_size_format = document.getElementById("marketing_size_format");
            const marketing_content = document.getElementById("marketing_content");
            const content_creation_help = document.getElementById("content_creation_help");

            services += `
            PRINT/MARKETING DESIGN\n
            Q: What types of print or marketing materials do you need?\r\nA: ${marketing_materials.value}\n
            Q: Any specific branding or design preferences?\r\nA: ${marketing_preferences.value}\n
            Q: What is the size and format for each item?\r\nA: ${marketing_size_format.value}\n
            Q: What content or copy needs to be included?\r\nA: ${marketing_content.value}\n
            Q: Do you need help with content creation?\r\nA: ${content_creation_help.value}\n
            `;
        }
        if (servicesList.includes('UI/UXDesign')) {
            const uiux_goal = document.getElementById("uiux_goal");
            const uiux_wireframes = document.getElementById("uiux_wireframes");
            const uiux_platforms = document.getElementById("uiux_platforms");
            const uiux_preferences = document.getElementById("uiux_preferences");

            services += `
            UI/UX DESIGN\n
            Q: What is the primary goal of your website or app?\r\nA: ${uiux_goal.value}\n
            Q: Do you have wireframes, sketches, or ideas to share?\r\nA: ${uiux_wireframes.value}\n
            Q: What platforms do you want your design to work on?\r\nA: ${uiux_platforms.value}\n
            Q: Any design preferences (colors, style, etc.)?\r\nA: ${uiux_preferences.value}\n
            `;
        }
        if (servicesList.includes('WebDevelopment')) {
            const web_goal = document.getElementById("web_goal");
            const web_custom_design = document.getElementById("web_custom_design");
            const web_features = document.getElementById("web_features");
            const web_seo = document.getElementById("web_seo");

            services += `
            WEB DEVELOPMENT\n
            Q: What is the goal or purpose of the website/Web App?\r\nA: ${web_goal.value}\n
            Q: Do you need a fully custom design or open to templates?\r\nA: ${web_custom_design.value}\n
            Q: What are the key features and functionalities you need?\r\nA: ${web_features.value}\n
            Q: Do you require SEO, marketing integrations, or analytics tools?\r\nA: ${web_seo.value}\n
            `;
        }
        if (servicesList.includes('MobileDevelopment')) {
            const mobile_platforms = document.getElementById("mobile_platforms");
            const mobile_features = document.getElementById("mobile_features");
            const mobile_designs = document.getElementById("mobile_designs");
            const mobile_integration = document.getElementById("mobile_integration");

            services += `
            MOBILE DEVELOPMENT\n
            Q: Do you want the app for iOS, Android, or both?\r\nA: ${mobile_platforms.value}\n
            Q: What core features would you like the app to have?\r\nA: ${mobile_features.value}\n
            Q: Do you already have designs or wireframes?\r\nA: ${mobile_designs.value}\n
            Q: Will the app need to integrate with other services?\r\nA: ${mobile_integration.value}\n
            `;
        }
        if (servicesList.includes('Backend/APIDevelopment')) {
            const backend_data = document.getElementById("backend_data");
            const backend_integration = document.getElementById("backend_integration");
            const backend_scalability = document.getElementById("backend_scalability");
            const backend_security = document.getElementById("backend_security");
            const backend_traffic = document.getElementById("backend_traffic");

            services += `
            BACKEND/API DEVELOPMENT\n
            Q: What kind of data will the system handle?\r\nA: ${backend_data.value}\n
            Q: Do you have any existing systems or APIs?\r\nA: ${backend_integration.value}\n
            Q: What performance or scalability requirements do you have?\r\nA: ${backend_scalability.value}\n
            Q: Any specific security or compliance needs?\r\nA: ${backend_security.value}\n
            Q: Expected traffic volume or user load?\r\nA: ${backend_traffic.value}\n
            `;
        }



        // const projectType = document.getElementById("project-type").value.trim();
        const budget = document.getElementById("budget").value.trim();
        const deadline = document.getElementById("deadline").value.trim();
        // const description = document.getElementById("description").value.trim();
        const target = document.getElementById("target").value.trim();

        const message = `
        Referred by: ${referrer}\n
        Preferred Communication Method: ${method}\n
        Company Name: ${company}\n
        Project Type: ${selectedTypes.join(", ")}\n
        Budget: ${budget}\n
        Deadline (yyyy-mm-dd): ${deadline}\n
        Target Audience or Customer: ${target}\n
        ${services}
        `;
        
        console.log(message);
        
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
        // form.reset();
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







