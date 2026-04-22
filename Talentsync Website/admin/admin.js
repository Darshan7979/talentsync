import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  Timestamp,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ---------------- FIREBASE ---------------- */
const firebaseConfig = {
  apiKey: "AIzaSyBJqcYHF6LMVc-lCJWnb4PFDC_bWLdlgaI",
  authDomain: "talentsync-hr-solutions.firebaseapp.com",
  projectId: "talentsync-hr-solutions",
  storageBucket: "talentsync-hr-solutions.firebasestorage.app",
  messagingSenderId: "402073208252",
  appId: "1:402073208252:web:f7526cfa44c274025257b9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ---------------- GLOBALS ---------------- */
let editId = null;

/* ---------------- FORM ELEMENTS ---------------- */
const form = document.getElementById("jobForm");
const submitBtn = document.getElementById("submitBtn");

const company = document.getElementById("company");
const jobTitle = document.getElementById("jobTitle");
const location = document.getElementById("location");
const salary = document.getElementById("salary");
const requirements = document.getElementById("requirements");
const roles = document.getElementById("roles");
const industries = document.getElementById("industries");
const hiringModel = document.getElementById("hiringModel");
const turnaround = document.getElementById("turnaround");
const description = document.getElementById("description");
const highlights = document.getElementById("highlights");

/* ---------------- SECTIONS ---------------- */
const addTab = document.getElementById("addTab");
const viewTab = document.getElementById("viewTab");

const addSection = document.getElementById("addSection");
const jobsSection = document.getElementById("jobsSection");

/* ---------------- ADD / UPDATE JOB ---------------- */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    company: company.value,
    jobTitle: jobTitle.value,
    location: location.value,
    salary: salary.value,
    requirements: requirements.value,
    roles: roles.value,
    industries: industries.value,
    hiringModel: hiringModel.value,
    turnaround: turnaround.value,
    description: description.value,
    highlights: highlights.value,
  };

  try {
    if (editId) {
      // UPDATE
      await updateDoc(doc(db, "jobs", editId), data);
      alert("Job Updated ✅");

      editId = null;
      submitBtn.innerText = "Post Job";
    } else {
      // ADD
      await addDoc(collection(db, "jobs"), {
        ...data,
        createdAt: Timestamp.now()
      });
      alert("Job Added ✅");
    }

    form.reset();

  } catch (error) {
    console.error(error);
    alert("Error ❌ " + error.message);
  }
});

/* ---------------- SIDEBAR SWITCH ---------------- */
addTab.onclick = () => {
  addSection.style.display = "block";
  jobsSection.style.display = "none";

  addTab.classList.add("active");
  viewTab.classList.remove("active");
};

viewTab.onclick = async () => {
  addSection.style.display = "none";
  jobsSection.style.display = "block";

  viewTab.classList.add("active");
  addTab.classList.remove("active");

  loadJobs();
};

/* ---------------- LOAD JOBS ---------------- */
async function loadJobs() {
  const container = document.getElementById("jobsContainer");
  container.innerHTML = "Loading...";

  const querySnapshot = await getDocs(collection(db, "jobs"));
  container.innerHTML = "";

  querySnapshot.forEach((documentItem) => {
    const job = documentItem.data();
    const id = documentItem.id;

    const tab = document.createElement("div");
    tab.classList.add("job-tab");

    tab.innerHTML = `
      <div class="job-header">
        <div class="job-header-left">
          <div class="job-icon">💼</div>
          <div>
            <div class="job-title">${job.jobTitle}</div>
            <div class="job-company">${job.company}</div>
          </div>
        </div>
        <span class="job-chevron">▼</span>
      </div>

      <div class="job-body">
        <p><b>Location:</b> ${job.location}</p>
        <p><b>Salary:</b> ${job.salary}</p>
        <p><b>Hiring Model:</b> ${job.hiringModel}</p>
        <p><b>Turnaround:</b> ${job.turnaround}</p>
        <p><b>Skills:</b> ${job.requirements}</p>
        <p><b>Roles:</b> ${job.roles}</p>
        <p><b>Industry:</b> ${job.industries}</p>
        <p><b>Description:</b> ${job.description}</p>
        <p><b>Highlights:</b> ${job.highlights}</p>

        <div class="job-actions">
          <button class="edit-btn">✏️ Edit</button>
          <button class="delete-btn">🗑️ Delete</button>
        </div>
      </div>
    `;

    /* TOGGLE ACCORDION */
    tab.querySelector(".job-header").onclick = () => {
      const body = tab.querySelector(".job-body");
      const isOpen = body.style.display === "block";
      body.style.display = isOpen ? "none" : "block";
      tab.classList.toggle("open", !isOpen);
    };

    /* DELETE */
    tab.querySelector(".delete-btn").onclick = async () => {
      const confirmDelete = confirm("Delete this job?");
      if (!confirmDelete) return;

      await deleteDoc(doc(db, "jobs", id));
      alert("Deleted ✅");
      loadJobs();
    };

    /* EDIT */
    tab.querySelector(".edit-btn").onclick = () => {
      // Fill form
      company.value = job.company;
      jobTitle.value = job.jobTitle;
      location.value = job.location;
      salary.value = job.salary;
      requirements.value = job.requirements;
      roles.value = job.roles;
      industries.value = job.industries;
      hiringModel.value = job.hiringModel;
      turnaround.value = job.turnaround;
      description.value = job.description;
      highlights.value = job.highlights;

      // Switch tab
      addSection.style.display = "block";
      jobsSection.style.display = "none";

      addTab.classList.add("active");
      viewTab.classList.remove("active");

      // Change button
      submitBtn.innerText = "Update Job";

      // Store ID
      editId = id;
    };

    container.appendChild(tab);
  });
}