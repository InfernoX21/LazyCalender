// Main JavaScript file for The Lazy Calendar
document.addEventListener('DOMContentLoaded', function() {
    console.log('The Lazy Calendar loaded!');
    
    // Initialize the app
    initializeCalendar();
    setupEventListeners();
    updateCards();
});

// Date utilities
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const weekdays = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const shortMonths = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// Get current date and related dates
function getDates() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    return { today, yesterday, tomorrow };
}

// Format date for display
function formatDate(date) {
    const month = shortMonths[date.getMonth()];
    const day = date.getDate();
    return `${month} ${day}`;
}

// Update the three cards with current dates
function updateCards() {
    const { today, yesterday, tomorrow } = getDates();
    
    // Update yesterday card
    document.getElementById('yesterdayWeekday').textContent = weekdays[yesterday.getDay()];
    document.getElementById('yesterdayDate').textContent = formatDate(yesterday);
    
    // Update today card
    document.getElementById('todayWeekday').textContent = weekdays[today.getDay()];
    document.getElementById('todayDate').textContent = formatDate(today);
    
    // Update tomorrow card
    document.getElementById('tomorrowWeekday').textContent = weekdays[tomorrow.getDay()];
    document.getElementById('tomorrowDate').textContent = formatDate(tomorrow);
}

// Initialize calendar
function initializeCalendar() {
    const today = new Date();
    generateCalendar(today.getFullYear(), today.getMonth());
}

// Generate calendar for given month and year
function generateCalendar(year, month) {
    const today = new Date();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    // Update calendar title
    document.getElementById('calendarTitle').textContent = `${months[month]} ${year}`;
    
    // Clear existing calendar days
    const calendarGrid = document.querySelector('.calendar-grid');
    const existingDays = calendarGrid.querySelectorAll('.calendar-day');
    existingDays.forEach(day => day.remove());
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear = month === 0 ? year - 1 : year;
        const prevMonthLastDay = new Date(prevYear, prevMonth + 1, 0).getDate();
        const dayNum = prevMonthLastDay - startingDayOfWeek + i + 1;
        
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day other-month';
        dayElement.textContent = dayNum;
        calendarGrid.appendChild(dayElement);
    }
    
    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        // Highlight today
        if (year === today.getFullYear() && 
            month === today.getMonth() && 
            day === today.getDate()) {
            dayElement.classList.add('today');
        }
        
        calendarGrid.appendChild(dayElement);
    }
    
    // Add days from next month to fill the grid
    const totalCells = calendarGrid.children.length;
    const remainingCells = 42 - totalCells; // 6 rows × 7 days = 42 cells
    
    for (let day = 1; day <= remainingCells && totalCells < 42; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day other-month';
        dayElement.textContent = day;
        calendarGrid.appendChild(dayElement);
    }
}

// Setup event listeners
function setupEventListeners() {
    const calendarBtn = document.getElementById('calendarBtn');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('closeBtn');
    
    // Open calendar
    calendarBtn.addEventListener('click', function() {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close calendar
    closeBtn.addEventListener('click', function() {
        closeCalendar();
    });
    
    // Close calendar when clicking outside popup
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeCalendar();
        }
    });
    
    // Close calendar with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeCalendar();
        }
    });
}

// Close calendar function
function closeCalendar() {
    const overlay = document.getElementById('overlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Update calendar every minute to keep it current
setInterval(updateCards, 60000);// This file contains the client-side JavaScript code that adds interactivity to the web application.
