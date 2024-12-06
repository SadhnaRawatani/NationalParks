const uniqueTicketForm = document.getElementById('uniqueTicketForm');
const uniqueTicketQuantity = document.getElementById('uniqueTicketQuantity');
const uniqueTicketType = document.getElementById('uniqueTicketType');
const uniqueTotalCostDisplay = document.getElementById('uniqueTotalCost');
const uniqueConfirmationModal = new bootstrap.Modal(document.getElementById('uniqueConfirmationModal'));
const uniqueSuccessMessage = document.getElementById('uniqueSuccessMessage');
const uniqueSubmitTicketForm = document.getElementById('uniqueSubmitTicketForm');
const uniqueConfirmPurchase = document.getElementById('uniqueConfirmPurchase');
const uniqueConfirmationDetails = document.getElementById('uniqueConfirmationDetails');
const uniqueFullNameInput = document.getElementById('uniqueFullName');
const uniqueEmailInput = document.getElementById('uniqueEmail');
const uniqueFullNameError = document.getElementById('uniqueFullNameError');
const uniqueEmailError = document.getElementById('uniqueEmailError');

function updateUniqueTotalCost() {
  const cost = parseFloat(uniqueTicketType.value) || 0;
  const quantity = parseInt(uniqueTicketQuantity.value) || 1;
  uniqueTotalCostDisplay.textContent = cost *  quantity;
}


function validateUniqueForm(e) {
  e.preventDefault();
  let isValid = true;

  if (!uniqueFullNameInput.value.trim().match(/^[a-zA-Z]+\s[a-zA-Z]+$/)) {
    uniqueFullNameError.textContent = "Please enter a valid full name with at least two words.";
    isValid = false;
  } else {
    uniqueFullNameError.textContent = "";
  }

  if (!uniqueEmailInput.value.trim().match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
    uniqueEmailError.textContent = "Please enter a valid email address.";
    isValid = false;
  } else {
    uniqueEmailError.textContent = "";
  }

  return isValid;
}

uniqueTicketType.addEventListener('change', updateUniqueTotalCost);
uniqueTicketQuantity.addEventListener('input', updateUniqueTotalCost);

uniqueSubmitTicketForm.addEventListener('click', function (event) {
  event.preventDefault();

  if (validateUniqueForm(event)) {
    uniqueConfirmationDetails.innerHTML = `
      <p><strong>Name:</strong> ${uniqueFullNameInput.value}</p>
      <p><strong>Email:</strong> ${uniqueEmailInput.value}</p>
      <p><strong>Ticket Type:</strong> ${uniqueTicketType.options[uniqueTicketType.selectedIndex].text}</p>
      <p><strong>Quantity:</strong> ${uniqueTicketQuantity.value}</p>
      <p><strong>Total Cost:</strong> Rs ${uniqueTotalCostDisplay.textContent}</p>
    `;
    uniqueConfirmationModal.show();

  }
});


const uniqueBuyTicketModal = new bootstrap.Modal(document.getElementById('uniqueBuyTicketModal'));

uniqueConfirmPurchase.addEventListener('click', function (e) {
  e.preventDefault();

  localStorage.setItem("fullName", uniqueFullNameInput.value);
  localStorage.setItem("Email", uniqueEmailInput.value);
  localStorage.setItem("type", uniqueTicketType.options[uniqueTicketType.selectedIndex].text);
  localStorage.setItem("ticketquantity", uniqueTicketQuantity.value);
  localStorage.setItem("ticketcost", uniqueTotalCostDisplay.textContent);

uniqueBuyTicketModal.hide(); // Hide the form modal
uniqueConfirmationModal.hide(); // Hide the confirmation modal
uniqueSuccessMessage.classList.remove('unique-hidden');
setTimeout(() => {
uniqueSuccessMessage.classList.add('unique-hidden'); // Hide success message after timeout
uniqueTicketForm.reset();
uniqueTotalCostDisplay.textContent = "0";
}, 3000);
});
