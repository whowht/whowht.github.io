document.getElementById('projects-btn').addEventListener('click', () => {
  const passcode = prompt('Enter the passcode to access the projects:');
  if (passcode === '7823') {
    window.open('https://github.com/WhoWht', '_blank');
  } else {
    alert('Incorrect passcode!');
  }
});

document.getElementById('social-btn').addEventListener('click', () => {
  const socialLinks = `
    <h2>Connect with me:</h2>
    <p><a href="https://facebook.com" target="_blank">Facebook</a></p>
    <p><a href="https://instagram.com" target="_blank">Instagram</a></p>
    <p><a href="https://discord.com" target="_blank">Discord</a></p>
  `;
  openModal(socialLinks);
});

document.getElementById('close-modal').addEventListener('click', () => {
  closeModal();
});

function openModal(content) {
  const modal = document.getElementById('modal');
  document.getElementById('modal-body').innerHTML = content;
  modal.classList.remove('hidden');
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
}
