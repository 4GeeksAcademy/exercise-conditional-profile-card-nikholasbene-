

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "right", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables);

  // Cover logic
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover === false) cover = "<div class='cover'></div>";

  // Fallbacks if user leaves fields empty
  const fullName = `${variables.name || "Your"} ${variables.lastName || "Name"}`;
  const role = variables.role || "Web Developer";
  const location = `${variables.city || "City"}, ${variables.country || "Country"}`;

  // Social media links 
  const socialMediaLinks = `
    ${variables.twitter ? `<li><a href="https://twitter.com/${variables.twitter}"><i class="fab fa-twitter"></i></a></li>` : ""}
    ${variables.github ? `<li><a href="https://github.com/${variables.github}"><i class="fab fa-github"></i></a></li>` : ""}
    ${variables.linkedin ? `<li><a href="https://linkedin.com/in/${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>` : ""}
    ${variables.instagram ? `<li><a href="https://instagram.com/${variables.instagram}"><i class="fab fa-instagram"></i></a></li>` : ""}
  `;

  const positionClass = variables.socialMediaPosition || "position-right";

  // Render HTML
  document.querySelector("#widget_content").innerHTML = `
    <div class="widget">
      ${cover}
      <img src="${variables.avatarURL}" class="photo" />
      <h1>${fullName}</h1>
      <h2>${role}</h2>
      <h3>${location}</h3>
      <ul class="${positionClass}">
        ${socialMediaLinks}
      </ul>
    </div>
  `;
}


window.onload = function () {
  window.variables = {
    includeCover: true,
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    socialMediaPosition: "position-right",
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null,
  };

  render(window.variables); 

  // Listen to input changes
  document.querySelectorAll(".picker").forEach(function (elm) {
    elm.addEventListener("change", function (e) {
      const attribute = e.target.getAttribute("for");
      let values = {};
      values[attribute] =
        this.value === "" || this.value === "null"
          ? null
          : this.value === "true"
          ? true
          : this.value === "false"
          ? false
          : this.value;

      render(Object.assign(window.variables, values));
    });
  });
};