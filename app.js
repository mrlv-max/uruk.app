// Uruk Healthcare App JavaScript

// Application data
const appData = {
  user: {
    name: "Rajesh Kumar",
    age: 34,
    bloodGroup: "O+",
    emergencyContacts: ["Dr. Sarah Patel", "Family Doctor", "Emergency Services"]
  },
  vitals: {
    recent: {
      heartRate: "72 bpm",
      bloodPressure: "120/80 mmHg",
      temperature: "98.6°F",
      oxygenSaturation: "98%"
    },
    history: [
      {"date": "2025-10-07", "heartRate": 72, "systolic": 120, "diastolic": 80, "temperature": 98.6, "oxygen": 98},
      {"date": "2025-10-06", "heartRate": 75, "systolic": 118, "diastolic": 78, "temperature": 98.4, "oxygen": 97},
      {"date": "2025-10-05", "heartRate": 74, "systolic": 122, "diastolic": 82, "temperature": 98.7, "oxygen": 98},
      {"date": "2025-10-04", "heartRate": 73, "systolic": 119, "diastolic": 79, "temperature": 98.5, "oxygen": 97},
      {"date": "2025-10-03", "heartRate": 76, "systolic": 121, "diastolic": 81, "temperature": 98.8, "oxygen": 98}
    ]
  },
  appointments: [
    {
      id: 1,
      doctor: "Dr. Priya Sharma",
      specialty: "Cardiologist",
      date: "2025-10-10",
      time: "10:00 AM",
      status: "Confirmed"
    },
    {
      id: 2,
      doctor: "Dr. Amit Singh",
      specialty: "General Physician",
      date: "2025-10-12",
      time: "2:30 PM",
      status: "Pending"
    }
  ],
  doctors: [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialty: "Cardiologist",
      rating: 4.8,
      distance: "1.2 km",
      experience: "15 years",
      consultationFee: "₹800"
    },
    {
      id: 2,
      name: "Dr. Amit Singh",
      specialty: "General Physician",
      rating: 4.6,
      distance: "0.8 km",
      experience: "12 years",
      consultationFee: "₹600"
    },
    {
      id: 3,
      name: "Dr. Kavita Nair",
      specialty: "Dermatologist",
      rating: 4.9,
      distance: "2.1 km",
      experience: "18 years",
      consultationFee: "₹900"
    }
  ],
  medicines: [
    {
      id: 1,
      name: "Paracetamol 500mg",
      price: "₹25",
      category: "Pain Relief",
      manufacturer: "Cipla"
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      price: "₹85",
      category: "Antibiotic",
      manufacturer: "Sun Pharma"
    },
    {
      id: 3,
      name: "Vitamin D3 60K IU",
      price: "₹45",
      category: "Vitamins",
      manufacturer: "Mankind"
    }
  ],
  cart: []
};

let currentDoctorId = null;
let healthChart = null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
  setupEventListeners();
  renderHealthChart();
});

// Initialize the application
function initializeApp() {
  // Set default screen to dashboard
  showScreen('dashboard');
  
  // Set minimum date for appointment booking to today
  const today = new Date().toISOString().split('T')[0];
  const appointmentDateInput = document.getElementById('appointmentDate');
  if (appointmentDateInput) {
    appointmentDateInput.setAttribute('min', today);
  }
}

// Setup event listeners
function setupEventListeners() {
  // Bottom navigation
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      const screen = this.getAttribute('data-screen');
      showScreen(screen);
      updateNavigation(this);
    });
  });

  // Vitals form submission
  const vitalsForm = document.getElementById('vitals-form');
  if (vitalsForm) {
    vitalsForm.addEventListener('submit', handleVitalsSubmission);
  }

  // Appointment form submission
  const appointmentForm = document.getElementById('appointmentForm');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', handleAppointmentBooking);
  }

  // Search functionality
  const medicineSearch = document.getElementById('medicineSearch');
  if (medicineSearch) {
    medicineSearch.addEventListener('input', handleMedicineSearch);
  }

  const recordSearch = document.getElementById('recordSearch');
  if (recordSearch) {
    recordSearch.addEventListener('input', handleRecordSearch);
  }

  // Specialty filter
  const specialtyFilter = document.getElementById('specialtyFilter');
  if (specialtyFilter) {
    specialtyFilter.addEventListener('change', handleSpecialtyFilter);
  }
}

// Screen navigation
function showScreen(screenId) {
  // Hide all screens
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => {
    screen.classList.remove('active');
  });

  // Show selected screen
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
  }

  // Render chart when health screen is shown
  if (screenId === 'health' && !healthChart) {
    setTimeout(() => renderHealthChart(), 100);
  }
}

// Update navigation active state
function updateNavigation(activeItem) {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.classList.remove('active');
  });
  activeItem.classList.add('active');
}

// Emergency functions
function handleEmergencyCall() {
  const modal = document.getElementById('emergencyModal');
  modal.classList.remove('hidden');
}

function findNearbyTreatment() {
  showMessage('Finding nearby treatment centers...', 'success');
  // Simulate finding nearby treatment
  setTimeout(() => {
    showMessage('3 treatment centers found within 2km radius', 'success');
  }, 1500);
}

function reportSymptom() {
  showMessage('Opening symptom reporting form...', 'success');
  // In a real app, this would open a detailed symptom reporting form
}

function callContact(contactName) {
  showMessage(`Calling ${contactName}...`, 'success');
  closeModal('emergencyModal');
  // In a real app, this would initiate a phone call
}

// Vitals handling
function handleVitalsSubmission(e) {
  e.preventDefault();
  
  const heartRate = document.getElementById('heartRate').value;
  const systolic = document.getElementById('systolic').value;
  const diastolic = document.getElementById('diastolic').value;
  const temperature = document.getElementById('temperature').value;
  const oxygen = document.getElementById('oxygen').value;

  if (!heartRate || !systolic || !diastolic || !temperature || !oxygen) {
    showMessage('Please fill in all vital signs', 'error');
    return;
  }

  // Validate ranges
  if (heartRate < 40 || heartRate > 200) {
    showMessage('Heart rate seems unusual. Please check the value.', 'error');
    return;
  }

  if (systolic < 80 || systolic > 200 || diastolic < 40 || diastolic > 120) {
    showMessage('Blood pressure values seem unusual. Please check.', 'error');
    return;
  }

  // Add to vitals history
  const today = new Date().toISOString().split('T')[0];
  const newVital = {
    date: today,
    heartRate: parseInt(heartRate),
    systolic: parseInt(systolic),
    diastolic: parseInt(diastolic),
    temperature: parseFloat(temperature),
    oxygen: parseInt(oxygen)
  };

  appData.vitals.history.unshift(newVital);
  
  // Update recent vitals display
  updateRecentVitals(newVital);
  
  // Clear form
  document.getElementById('vitals-form').reset();
  
  // Update chart
  updateHealthChart();
  
  showMessage('Vitals recorded successfully!', 'success');

  // Check for health alerts
  checkHealthAlerts(newVital);
}

function updateRecentVitals(vitals) {
  const vitalCards = document.querySelectorAll('.vital-value');
  if (vitalCards.length >= 4) {
    vitalCards[0].textContent = `${vitals.heartRate} bpm`;
    vitalCards[1].textContent = `${vitals.systolic}/${vitals.diastolic}`;
    vitalCards[2].textContent = `${vitals.temperature}°F`;
    vitalCards[3].textContent = `${vitals.oxygen}%`;
  }
}

function checkHealthAlerts(vitals) {
  let alerts = [];
  
  if (vitals.heartRate > 100) {
    alerts.push('Heart rate is elevated');
  }
  if (vitals.systolic > 140 || vitals.diastolic > 90) {
    alerts.push('Blood pressure is elevated');
  }
  if (vitals.temperature > 100.4) {
    alerts.push('Temperature indicates fever');
  }
  if (vitals.oxygen < 95) {
    alerts.push('Oxygen saturation is low');
  }

  if (alerts.length > 0) {
    showMessage(`Health Alert: ${alerts.join(', ')}. Consider consulting a doctor.`, 'error');
  }
}

// Chart rendering
function renderHealthChart() {
  const ctx = document.getElementById('healthChart');
  if (!ctx || healthChart) return;

  const dates = appData.vitals.history.slice(0, 7).reverse().map(v => {
    const date = new Date(v.date);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  const heartRateData = appData.vitals.history.slice(0, 7).reverse().map(v => v.heartRate);
  const systolicData = appData.vitals.history.slice(0, 7).reverse().map(v => v.systolic);

  healthChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Heart Rate (bpm)',
          data: heartRateData,
          borderColor: '#1FB8CD',
          backgroundColor: 'rgba(31, 184, 205, 0.1)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Systolic BP (mmHg)',
          data: systolicData,
          borderColor: '#FFC185',
          backgroundColor: 'rgba(255, 193, 133, 0.1)',
          fill: true,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 20
          }
        }
      }
    }
  });
}

function updateHealthChart() {
  if (!healthChart) return;

  const dates = appData.vitals.history.slice(0, 7).reverse().map(v => {
    const date = new Date(v.date);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  const heartRateData = appData.vitals.history.slice(0, 7).reverse().map(v => v.heartRate);
  const systolicData = appData.vitals.history.slice(0, 7).reverse().map(v => v.systolic);

  healthChart.data.labels = dates;
  healthChart.data.datasets[0].data = heartRateData;
  healthChart.data.datasets[1].data = systolicData;
  healthChart.update();
}

// Appointment booking
function bookAppointment(doctorId) {
  currentDoctorId = doctorId;
  const doctor = appData.doctors.find(d => d.id === doctorId);
  if (doctor) {
    const modal = document.getElementById('appointmentModal');
    modal.classList.remove('hidden');
  }
}

function handleAppointmentBooking(e) {
  e.preventDefault();
  
  const date = document.getElementById('appointmentDate').value;
  const time = document.getElementById('appointmentTime').value;
  
  if (!date || !time) {
    showMessage('Please select both date and time', 'error');
    return;
  }

  const doctor = appData.doctors.find(d => d.id === currentDoctorId);
  if (doctor) {
    const newAppointment = {
      id: appData.appointments.length + 1,
      doctor: doctor.name,
      specialty: doctor.specialty,
      date: date,
      time: convertTime(time),
      status: 'Pending'
    };

    appData.appointments.push(newAppointment);
    showMessage(`Appointment booked with ${doctor.name} for ${formatDate(date)} at ${convertTime(time)}`, 'success');
    closeModal('appointmentModal');
    document.getElementById('appointmentForm').reset();
  }
}

function convertTime(time24) {
  const [hours, minutes] = time24.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

// Medicine and pharmacy functions
function addToCart(medicineId) {
  const medicine = appData.medicines.find(m => m.id === medicineId);
  if (medicine) {
    const existingItem = appData.cart.find(item => item.id === medicineId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      appData.cart.push({ ...medicine, quantity: 1 });
    }
    showMessage(`${medicine.name} added to cart`, 'success');
  }
}

function handleMedicineSearch(e) {
  const searchTerm = e.target.value.toLowerCase();
  const medicineCards = document.querySelectorAll('.medicine-card');
  
  medicineCards.forEach(card => {
    const medicineName = card.querySelector('h3').textContent.toLowerCase();
    if (medicineName.includes(searchTerm)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

function handleRecordSearch(e) {
  const searchTerm = e.target.value.toLowerCase();
  const recordItems = document.querySelectorAll('.record-item');
  
  recordItems.forEach(item => {
    const recordTitle = item.querySelector('h4').textContent.toLowerCase();
    const recordDetails = item.querySelector('p').textContent.toLowerCase();
    if (recordTitle.includes(searchTerm) || recordDetails.includes(searchTerm)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function handleSpecialtyFilter(e) {
  const selectedSpecialty = e.target.value.toLowerCase();
  const doctorCards = document.querySelectorAll('.doctor-card');
  
  doctorCards.forEach(card => {
    const specialty = card.querySelector('.specialty').textContent.toLowerCase();
    if (!selectedSpecialty || specialty.includes(selectedSpecialty)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// Modal functions
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
  }
}

// Click outside modal to close
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
    e.target.classList.add('hidden');
  }
});

// Message system
function showMessage(message, type = 'success') {
  const messageContainer = document.getElementById('messageContainer');
  const messageContent = document.getElementById('messageContent');
  
  messageContent.textContent = message;
  messageContent.className = `message ${type}`;
  messageContainer.classList.remove('hidden');
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    messageContainer.classList.add('hidden');
  }, 3000);
}

// Utility functions
function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  });
}

// AI Functions (simulated)
function analyzeReport() {
  showMessage('AI is analyzing your medical report...', 'success');
  setTimeout(() => {
    showMessage('Analysis complete! No immediate concerns detected. Consult your doctor for detailed review.', 'success');
  }, 2000);
}

function scanForInfection() {
  showMessage('AI infection scan in progress...', 'success');
  setTimeout(() => {
    showMessage('Scan complete! No signs of infection detected. Monitor symptoms and consult if they persist.', 'success');
  }, 2500);
}

// Profile functions
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  showMessage(`Dark mode ${isDark ? 'enabled' : 'disabled'}`, 'success');
}

function logout() {
  showMessage('Logging out...', 'success');
  setTimeout(() => {
    showMessage('Successfully logged out', 'success');
  }, 1000);
}

// Location sharing (simulated)
function shareLocation() {
  showMessage('Sharing location with URUK emergency team...', 'success');
  setTimeout(() => {
    showMessage('Location shared successfully. Help is on the way!', 'success');
  }, 1500);
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}