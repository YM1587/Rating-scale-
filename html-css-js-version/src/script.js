// write your JavaScript here
// Get Elements
const openModalButton = document.getElementById('openModalButton');
const modalOverlay = document.getElementById('modalOverlay');
const closeIcon = document.getElementById('closeIcon');
const cancelButton = document.getElementById('cancelButton');
const submitButton = document.getElementById('submitButton');
const ratingButtons = document.querySelectorAll('.ratings-button');

let selectedRating = null;

// Open Modal
openModalButton.addEventListener('click', () => {
  modalOverlay.classList.remove('hidden');
});

// Close Modal Function
function closeModal() {
  modalOverlay.classList.add('hidden');
  selectedRating = null;
  ratingButtons.forEach(btn => btn.classList.remove('selected'));
}

// Close on Cancel Button
cancelButton.addEventListener('click', closeModal);

// Close on X Icon
closeIcon.addEventListener('click', closeModal);

// Close on clicking outside modal
modalOverlay.addEventListener('click', (event) => {
  if (event.target === modalOverlay) {
    closeModal();
  }
});

// Handle Rating Button Clicks
ratingButtons.forEach(button => {
  button.addEventListener('click', () => {
    ratingButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    selectedRating = button.textContent;
  });
});

// Submit Feedback
submitButton.addEventListener('click', () => {
  if (selectedRating) {
    alert(`Thank you for your feedback! You rated us: ${selectedRating}`);
    closeModal();
  } else {
    alert("Please select a rating before submitting.");
  }
});
