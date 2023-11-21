function displayDataFromLocalStorage() {
  const tableBody = document.getElementById('tablebody');
  tableBody.innerHTML = '';

  const storedData = JSON.parse(localStorage.getItem('registrations')) || [];

  storedData.forEach(entry => {
    const newRow = tableBody.insertRow();
    newRow.insertCell().textContent = entry.name;
    newRow.insertCell().textContent = entry.email;
    newRow.insertCell().textContent = entry.password;
    newRow.insertCell().textContent = entry.dob;
    newRow.insertCell().textContent = entry.termsAccept ? 'Yes' : 'No';
  });
}

window.addEventListener('load', displayDataFromLocalStorage);

document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const termsAccept = document.getElementById('terms').checked;

  const dobDate = new Date(dob);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - dobDate.getFullYear();
  const isAgeValid = age >= 18 && age <= 55;

  if (!isAgeValid) {
    alert('Please enter a valid date of birth (between 18 and 55 years old).');
    return;
  }

  const entry = {
    name: name,
    email: email,
    password: password,
    dob: dob,
    termsAccept: termsAccept
  };

  let storedData = JSON.parse(localStorage.getItem('registrations')) || [];
  storedData.push(entry);
  localStorage.setItem('registrations', JSON.stringify(storedData));

  displayDataFromLocalStorage();

  document.getElementById('registrationForm').reset();
});
