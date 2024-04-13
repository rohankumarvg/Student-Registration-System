// Get references to the form and table elements
const studentForm = document.getElementById('student-form');
const studentTableBody = document.getElementById('student-table-body');
const searchInput = document.getElementById('search-input');

// Array to store student data
let studentData = [];

// Event listener for form submission
studentForm.addEventListener('submit', handleFormSubmit);

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent form submission

  // Get form input values
  const name = document.getElementById('name').value.trim();
  const id = document.getElementById('id').value.trim();
  const email = document.getElementById('email').value.trim();
  const contact = document.getElementById('contact').value.trim();
  const address = document.getElementById('address').value.trim();

  // Input validation
  const idError = document.getElementById('id-error');
  const contactError = document.getElementById('contact-error');

  let isValid = true;
  // Using RegEx for restricting input to certain conditions
  if (!/^\d+$/.test(id)) {
    idError.textContent = 'Student ID must contain only digits';
    isValid = false;
  } else {
    idError.textContent = '';
  }

  if (!/^\d+$/.test(contact)) {
    contactError.textContent = 'Contact No. must contain only digits';
    isValid = false;
  } else {
    contactError.textContent = '';
  }

  if (!isValid) {
    return; // Exit if input is invalid
  }

  // Check if the form is in edit mode
  const isEditMode = studentForm.dataset.editId !== undefined;

  if (isEditMode) {
    // Edit an existing student record
    const editId = studentForm.dataset.editId;
    const student = studentData.find(s => s.id === editId);
    student.name = name;
    student.email = email;
    student.contact = contact;
    student.address = address;
  } else {
    // Create a new student object
    const student = {
      name,
      id,
      email,
      contact,
      address,
    };

    // Add the student object to the data array
    studentData.push(student);
  }

  // Clear form inputs
  studentForm.reset();
  delete studentForm.dataset.editId;

  // Render the updated student table
  renderStudentTable(studentData);
}

// Function to render the student table
function renderStudentTable(data) {
  // Clear the existing table body
  studentTableBody.innerHTML = '';

  // Filter student data based on search input
  const searchTerm = searchInput.value.toLowerCase();
  const filteredData = data.filter(
    student =>
      student.name.toLowerCase().includes(searchTerm) ||
      student.id.toLowerCase().includes(searchTerm)
  );

  // Loop through the filtered data and create table rows
  filteredData.forEach(student => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = student.name;
    row.appendChild(nameCell);

    const idCell = document.createElement('td');
    idCell.textContent = student.id;
    row.appendChild(idCell);

    const emailCell = document.createElement('td');
    emailCell.textContent = student.email;
    row.appendChild(emailCell);

    const contactCell = document.createElement('td');
    contactCell.textContent = student.contact;
    row.appendChild(contactCell);

    const addressCell = document.createElement('td');
    addressCell.textContent = student.address;
    row.appendChild(addressCell);

    const actionsCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="material-icons">edit</i>';
    editButton.addEventListener('click', () => editStudent(student));
    actionsCell.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="material-icons">delete</i>';
    deleteButton.addEventListener('click', () => deleteStudent(student));
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);
    studentTableBody.appendChild(row);
  });
}

// Function to edit a student
function editStudent(student) {
  // Populate the form with the student data
  document.getElementById('name').value = student.name;
  document.getElementById('id').value = student.id;
  document.getElementById('email').value = student.email;
  document.getElementById('contact').value = student.contact;
  document.getElementById('address').value = student.address;

  // Set the form to edit mode
  studentForm.dataset.editId = student.id;
}

// Function to delete a student
function deleteStudent(student) {
  // Remove the student from the data array
  studentData = studentData.filter(s => s !== student);

  // Render the updated student table
  renderStudentTable(studentData);
}

// Event listener for search input
searchInput.addEventListener('input', function () {
  renderStudentTable(studentData);
});

// Initial render of the student table
renderStudentTable(studentData);
