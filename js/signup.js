// Sign Up Functionality
document.addEventListener('DOMContentLoaded', function() {
  const signupForm = document.getElementById('signup-form');
  
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const passwordConfirm = document.getElementById('password-confirm').value;
      
      // Simple validation
      if (!name || !email || !password || !passwordConfirm) {
        alert('Please fill in all fields');
        return;
      }
      
      if (password !== passwordConfirm) {
        alert('Passwords do not match');
        return;
      }
      
      if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
      }
      
      // Simulate sign up process
      console.log('Signing up with:', { name, email, password });
      
      // Show loading state
      const submitBtn = signupForm.querySelector('.signin-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Creating account...';
      submitBtn.disabled = true;
      
      // Simulate API call delay
      setTimeout(function() {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // For demo purposes, we'll store user data in localStorage
        const userData = {
          name: name,
          email: email,
          loggedIn: true
        };
        
        // Store user data
        localStorage.setItem('flexishop_user', JSON.stringify(userData));
        
        // For demo purposes, we'll just redirect to sign in page
        alert('Account created successfully! Welcome ' + name + '!');
        window.location.href = '../index.html';
      }, 1500);
    });
  }
});