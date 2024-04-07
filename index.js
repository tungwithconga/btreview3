document.addEventListener("DOMContentLoaded", function() {
    let circles = document.querySelectorAll(".circle");
    circles.forEach(function(circle) {
      circle.addEventListener("click", function() {
        circles.forEach(function(c) {
          c.classList.remove("selected");
        });
        this.classList.add("selected");
      });
    });
  
    document.getElementById('feedbackForm').addEventListener('submit', function(event) {
      event.preventDefault();
      
      let formData = new FormData(this);
      let feedbackData = {};
      let selectedRating = document.querySelector('.circle.selected');
      
      if (!selectedRating) {
        alert('Please select a rating!');
        return;
      }
      
      feedbackData['rating'] = selectedRating.getAttribute('data-rating');
      
      formData.forEach(function(value, key) {
        feedbackData[key] = value;
      });
      
      // Store feedback data locally
      localStorage.setItem('feedback', JSON.stringify(feedbackData));
      
      // Display feedback data
      displayFeedback();
      
      // Reset form and selected rating
      document.getElementById('feedbackForm').reset();
      circles.forEach(function(c) {
        c.classList.remove("selected");
      });
    });
    
    // Function to display feedback data
    function displayFeedback() {
      let storedData = JSON.parse(localStorage.getItem('feedback'));
      if (storedData) {
        let responseDiv = document.getElementById('response');
        responseDiv.innerHTML = `
          <h3>Đánh giá:</h3>
          <p><strong>Điểm:</strong> ${storedData.rating}/10</p>
          <p><strong>Lời nhắn:</strong> ${storedData.feedback}</p>
        `;
      }
    }
    
    // Call displayFeedback on page load
    displayFeedback();
  });
  