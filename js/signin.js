// Sign In Functionality
document.addEventListener('DOMContentLoaded', function() {
  const signinForm = document.getElementById('signin-form');
  
  if (signinForm) {
    signinForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      // Simple validation
      if (!email || !password) {
        alert('Please fill in all fields');
        return;
      }
      
      // Simulate sign in process
      console.log('Signing in with:', { email, password });
      
      // Show loading state
      const submitBtn = signinForm.querySelector('.signin-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Signing in...';
      submitBtn.disabled = true;
      
      // Simulate API call delay
      setTimeout(function() {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // For demo purposes, we'll store user data in localStorage
        const userData = {
          name: email.split('@')[0], // Use email prefix as name for demo
          email: email,
          loggedIn: true
        };
        
        // Store user data
        localStorage.setItem('flexishop_user', JSON.stringify(userData));
        
        // Redirect to home page
        alert('Sign in successful! Redirecting to home page.');
        window.location.href = '../index.html';
      }, 1500);
    });
  }
});