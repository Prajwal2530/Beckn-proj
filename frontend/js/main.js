console.log('Frontend loaded');
document.getElementById('skillForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const skill = document.getElementById('skill').value;
  document.getElementById('results').innerText = 'Loading...';
  try {
    const response = await fetch('http://localhost:5000/api/beckn/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skill })
    });
    const data = await response.json();
    if (data.mock_data) {
      document.getElementById('results').innerText = `Mock: ${data.mock_data.skill}, NSQF: ${data.mock_data.nsqf_level}`;
      if (data.mapped_data) {
        const mappedStr = data.mapped_data.map(item => `${item.name}: ${item.competency_level} (NSQF ${item.nsqf_level})`).join('\n');
        document.getElementById('results').innerText += `\nMapped: ${mappedStr}`;
      }
    } else {
      document.getElementById('results').innerText = `Found: ${data.message}`;
    }
  } catch (error) {
    document.getElementById('results').innerText = `Error: ${error.message}`;
  }
});

// Optional auto-fetch on load (commented out to avoid conflict)
/*
fetch('http://localhost:5000/api/beckn/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ skill: 'python' })
})
.then(response => response.json())
.then(data => {
  if (data.mock_data) {
    document.getElementById('results').innerText = `Mock: ${data.mock_data.skill}, NSQF: ${data.mock_data.nsqf_level}`;
  } else {
    document.getElementById('results').innerText = `Found: ${data.message}`;
  }
})
.catch(error => console.error('Fetch error:', error));
*/