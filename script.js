let menuBtn = document.getElementById("menuBtn");
let navlinks = document.querySelector(".navlinks");
let menuIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", function () {
    navlinks.classList.toggle("active");
    if (navlinks.classList.contains("active")) {
        menuIcon.classList.replace("fa-bars", "fa-xmark");
    } else {
        menuIcon.classList.replace("fa-xmark", "fa-bars");
    }
});

let bookingForm = document.querySelector(".booking-form");
let nameInput = document.getElementById("name");
let phoneInput = document.getElementById("phone");
let serviceInput = document.getElementById("service");
let addressInput = document.getElementById("address");
let dateInput = document.getElementById("date");

bookingForm.addEventListener("submit" ,function (e) {
    e.preventDefault();
    let name = nameInput.value.trim();
    let phone = phoneInput.value.trim ();
    let service = serviceInput.value.trim();
    let address = addressInput.value.trim();
    let date = dateInput.value;
    if (name === "" || phone === "" || service === "" || address === "" || date === "") {
        alert("Please fill in all required feilds!")
        return;
    }
    let bookingId = "QF-" + Date.now();

    let booking ={
        id : bookingId,
        name : name,
        phone : phone,
        service : service,
        address : address,
        date : date,
        details: document.getElementById("details").value,
        status: "Pending"
    }
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("Your booking has been submitted successfully!\nYour Booking ID: " + bookingId);
    bookingForm.reset();
});

let bookingIdInput = document.getElementById("bookingId");
let trackBtn = document.getElementById("trackBtn");
let trackingResult = document.getElementById("trackingResult");

trackBtn.addEventListener("click" ,function () {
    let enteredId = bookingIdInput.value.trim();
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    let foundBooking = bookings.find(function (booking) {
        return booking.id ===enteredId;
    });
    if (enteredId === "") {
        trackingResult.innerHTML = "Please enter your Booking ID!";
        return;
    }
    if (!foundBooking) {
        trackingResult.innerHTML = "Booking not found.Please check your ID.";
        return;
    }
    trackingResult.innerHTML = `
    <div class="tracking-details">
    <h3>Booking Found!</h3> 
    <p><strong>Name:</strong> ${foundBooking.name}</p>
    <p><strong>Service:</strong> ${foundBooking.service}</p>
    <p><strong>Booking ID:</strong> ${foundBooking.id}</p>
    <p><strong>Date:</strong> ${foundBooking.date}</p>
    <p><strong>Status:</strong> ${foundBooking.status}</p></div>
    `;
});

let adminBookingId = document.getElementById("adminBookingId");
let newStatus = document.getElementById("newStatus");
let updateStatusBtn = document.getElementById("updateStatusBtn");
let statusMessage = document.getElementById("statusMessage");

updateStatusBtn.addEventListener("click", function () {

    let enteredId = adminBookingId.value.trim();
    let selectedStatus = newStatus.value;
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    if (enteredId === "" || selectedStatus === "") {
        statusMessage.innerHTML = "Please enter Booking ID and select status!";
        return;
    }
    let foundBooking = bookings.find(function (booking) {
        return booking.id === enteredId;
    });
    if (!foundBooking) {
        statusMessage.innerHTML = "Booking not found!";
        return;
    }
    foundBooking.status = selectedStatus;
    localStorage.setItem("bookings", JSON.stringify(bookings));
    statusMessage.innerHTML = "Booking status updated successfully!";
    trackBtn.click();

});

let contactForm = document.querySelector(".contact-form");
let contactName = document.getElementById("contactName");
let contactEmail = document.getElementById("contactEmail");
let contactSubject = document.getElementById("contactSubject");
let contactMessage = document.getElementById("contactMessage");

contactForm.addEventListener("submit" ,function (e) {
    e.preventDefault();

    let name = contactName.value.trim();
    let email = contactEmail.value.trim();
    let subject = contactSubject.value.trim();
    let message = contactMessage.value.trim();

    if (name === "" || email === "" || subject === "" || message === "") {
        alert("Please fill in all fields!");
        return;
    }
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address!");
    return;
}
    alert("Thank you! Your message has been sent successfully.");
    contactForm.reset();
});