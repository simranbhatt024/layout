$(document).ready(function() {
  let data;

  // Fetch the data from the JSON
  $.getJSON('data.json', function(response) {
    data = response;
  });

  // Update the main content based on the category
  function update content(category) {
    const category data = data[category];
    const main section = $('main');

    // Clear the content
   

    // Create a new section with the category data
    const section = $('<section>', { id: category, class: 'mb-4' });
    const header = $('<h4>', { class: 'mb-2' }).text(category.replace(/-/g, ' & '));
    section.append(header);

    // Job details
    categoryData.forEach(job => {
      const jobBox = $('<div>', { class: 'col-md-4 job-box' });
      jobBox.append($('<h5>').text(job.jobTitle));
      jobBox.append($('<p>', { class: 'mb-2' }).html(`<b>${job.salary}</b>`));

      const salaryInfo = $('<div>', { class: 'salary-info' });
      salaryInfo.append($('<div>', { class: 'low-high' }).html(`<p>low</p><p><b>${job.low}</b></p>`));
      salaryInfo.append($('<div>', { class: 'low-high' }).html(`<p>high</p><p><b>${job.high}</b></p>`));
      jobBox.append(salaryInfo);

      section.append(jobBox);
    });

    mainSection.append(section);
  }

  // Click event listeners to the sidebar links
  $('.nav-link').click(function(event) {
    event.preventDefault();
    alert('Link clicked!'); // Alert added here

   // if (!data) {
    //  alert('Data is not loaded yet. Please try again in a moment.');
    //  return;
   // }

    const category = $(this).attr('href').substring(1);
    updateContent(category);
  });
});

// for country
document.addEventListener("DOMContentLoaded", function() {
  // Get all country buttons
  const countryButtons = document.querySelectorAll(".btn.nav-item");

  // Add click event listener to each country button
  countryButtons.forEach(button => {
      button.addEventListener("click", function() {
          // Remove 'active' class from all country buttons
          countryButtons.forEach(btn => {
              btn.classList.remove("active");
          });

          // Add 'active' class to the clicked button
          button.classList.add("active");

          // Show alert after clicking on a country button
         // alert(`You clicked on ${button.textContent.trim()}`);
      });
  });
});

/// hidden section
document.addEventListener("DOMContentLoaded", function() {
  // Get the main section element
  const mainSection = document.querySelector(".hidden-section");

  // Show the section initially
  mainSection.style.display = "block";

  // Now you can use JavaScript to interact with the section as needed
  // For example, you can add event listeners to elements inside this section
});
/// filtering
$(document).ready(function() {
    let selectedCountry = '';
    let selectedCategory = '';

    // Event listener for country buttons
    $('.flag-button').click(function() {
        selectedCountry = $(this).data('country');  // Get the country from the clicked button
        fetchAndDisplayJobData();  // Call function to fetch and display job data
    });

    // Event listener for category buttons
    $('.sidebar-button').click(function() {
        selectedCategory = $(this).data('category');  // Get the category from the clicked button
        fetchAndDisplayJobData();  // Call function to fetch and display job data
    });

    function fetchAndDisplayJobData() {
        if (selectedCountry && selectedCategory) {  // Ensure both country and category are selected
            $.getJSON('jobsData.json', function(jobData) {  // Fetch job data from the JSON file
                const jobDetails = jobData[selectedCountry][selectedCategory];  // Get job details for the selected country and category
                if (jobDetails) {  // If job details are found
                    $('#jobDataContainer').html(`
                        <h3>${selectedCategory} in ${selectedCountry}</h3>
                        <p><strong>Job Title:</strong> ${jobDetails.JobTitle}</p>
                        <p><strong>Average Salary:</strong> ${jobDetails.AverageSalary}</p>
                        <p><strong>Top Companies:</strong> ${jobDetails.TopCompanies.join(', ')}</p>
                    `);
                } else {  // If no job details are found
                    $('#jobDataContainer').html('<p>No data available for the selected country and category.</p>');
                }
            });
        }
    }
});
