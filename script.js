const surveyForm = document.getElementById("surveyForm");

surveyForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(surveyForm);

  const formObject = {};
  formData.forEach((value, key) => {
    if (formObject[key]) {
      if (!Array.isArray(formObject[key])) {
        formObject[key] = [formObject[key]];
      }
      formObject[key].push(value);
    } else {
      formObject[key] = value;
    }
  });

  let savedData = JSON.parse(localStorage.getItem("surveyData")) || [];
  savedData.push(formObject);
  localStorage.setItem("surveyData", JSON.stringify(savedData));

  surveyForm.reset();

  alert("Дані успішно збережені!");
});

function filterByFaculty(savedData, faculty) {
  return savedData.filter((data) => data.faculty === faculty);
}

function filterByTechnologyExperience(savedData) {
  return savedData.filter((data) => {
    const technologies = data.technology || [];
    return technologies.length === 3;
  });
}

function filterByGrade(savedData, minGrade) {
  return savedData.filter((data) => {
    const averageGrade = parseFloat(data.averageGrade);
    return averageGrade >= minGrade;
  });
}

function getFilteredData() {
  const savedData = JSON.parse(localStorage.getItem("surveyData")) || [];

  const facultyFilteredData = filterByFaculty(savedData, "faculty1");
  const facultyFilteredEmails = facultyFilteredData
    .map((data) => data.email)
    .join(", ");
  document.getElementById("filteredByFaculty").textContent =
    facultyFilteredEmails;

  const technologyExperienceFilteredData =
    filterByTechnologyExperience(savedData);
  const technologyExperienceFilteredEmails = technologyExperienceFilteredData
    .map((data) => data.email)
    .join(", ");
  document.getElementById("filteredByTechnologyExperience").textContent =
    technologyExperienceFilteredEmails;

  const minGrade = 3;
  const gradeFilteredData = filterByGrade(savedData, minGrade);
  const gradeFilteredEmails = gradeFilteredData
    .map((data) => data.email)
    .join(", ");
  document.getElementById("filteredByAverageGrade").textContent =
    gradeFilteredEmails;
}

document.getElementById("filterButton").addEventListener("click", () => {
  getFilteredData();
});

document.getElementById("localStorageClear").addEventListener("click", () => {
  localStorage.clear();
  getFilteredData();
});
