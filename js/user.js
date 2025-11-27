// User Session Management
class UserManager {
  static getUser() {
    const user = localStorage.getItem('flexishop_user');
    return user ? JSON.parse(user) : null;
  }
  
  static setUser(userData) {
    localStorage.setItem('flexishop_user', JSON.stringify(userData));
  }
  
  static clearUser() {
    localStorage.removeItem('flexishop_user');
  }
  
  static isLoggedIn() {
    return !!this.getUser();
  }
  
  static getUserName() {
    const user = this.getUser();
    return user ? user.name : 'Sign in';
  }
}

// Update header based on user status
document.addEventListener('DOMContentLoaded', function() {
  // Update sign-in link based on user status
  const signInLinks = document.querySelectorAll('.nav-links a[href*="signin.html"]');
  
  signInLinks.forEach(link => {
    if (UserManager.isLoggedIn()) {
      // User is logged in, update the link to show username
      const spanElements = link.querySelectorAll('span');
      if (spanElements.length >= 2) {
        spanElements[0].textContent = `Hello, ${UserManager.getUserName()}`;
        spanElements[1].innerHTML = 'Account & Lists <a href="#" id="signout-link" style="display: block; font-size: 12px; color: #fff; text-decoration: underline;">Sign Out</a>';
      }
    } else {
      // User is not logged in, show sign in link
      const spanElements = link.querySelectorAll('span');
      if (spanElements.length >= 2) {
        spanElements[0].textContent = 'Hello, Sign in';
        spanElements[1].textContent = 'Account & Lists';
      }
    }
  });
  
  // Handle sign out after the sign-in link has been updated
  setTimeout(function() {
    const signOutLink = document.getElementById('signout-link');
    if (signOutLink) {
      signOutLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        UserManager.clearUser();
        // Refresh the page to update the header
        location.reload();
      });
    }
  }, 100);
});