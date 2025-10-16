// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  // Simple mock login
  alert(`Welcome, ${email}!`);
});

// Close button hides the login box
document.querySelector('.close-btn').addEventListener('click', () => {
  document.querySelector('.login-container').style.display = 'none';
});
