// Simple form submission handler
document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Registration successful!");
});

// Close button function
function closeRegister() {
  window.location.href = "../index.html"; // redirect to homepage
}
