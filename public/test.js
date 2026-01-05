function showPass() {
  const passwordField = document.getElementById('password');
  passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
}

async function getAppstate() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const messageDiv = document.getElementById('message');
  const appstateDiv = document.getElementById('appstate-result');
  const copyButton = document.querySelector('.copy-button');

  if (!email || !password) {
    messageDiv.textContent = 'Please fill in both email and password fields.';
    return;
  }

  messageDiv.textContent = 'Fetching appstate...';
  appstateDiv.textContent = '';
  copyButton.style.display = 'none';

  try {
    const response = await fetch(`https://deku-rest-api.gleeze.com/getcookie?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    const data = await response.json();

    if (response.ok) {
      const cookies = data.cookie;
      if (!cookies || cookies.length === 0) {
        throw new Error("No cookies found in the response.");
      }
      messageDiv.style.color = 'green';
      messageDiv.textContent = 'Appstate fetched successfully.';
      appstateDiv.textContent = JSON.stringify(cookies, null, 2);
      copyButton.style.display = 'block';
    } else {
      messageDiv.style.color = 'red';
      messageDiv.textContent = `Error: ${data.message || 'Failed to fetch appstate'}`;
      console.error('Error response:', data);
    }
  } catch (error) {
    messageDiv.style.color = 'red';
    messageDiv.textContent = `Error: ${error.message || 'Failed to fetch appstate'}`;
    console.error('Fetch error:', error);
  }
}

function copyToClipboard() {
  const appstateDiv = document.getElementById('appstate-result');
  const textArea = document.createElement('textarea');
  textArea.value = appstateDiv.textContent;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
  $('#copyModal').modal('show');
}

$('#toggle-theme').click(function () {
  $("body").toggleClass('light');
  $(".toggle").toggleClass('light');
});