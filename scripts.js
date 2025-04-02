let currentStep = 1;

// Initialize the form with the first step active
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('step1').classList.add('active');
});

function nextStep(step) {
    document.getElementById('step' + currentStep).classList.remove('active');
    currentStep = step;
    document.getElementById('step' + currentStep).classList.add('active');
    
    // Update confirmation details when moving to step 3
    if (step === 3) {
        updateConfirmationDetails();
    }
}

function previousStep(step) {
    document.getElementById('step' + currentStep).classList.remove('active');
    currentStep = step;
    document.getElementById('step' + currentStep).classList.add('active');
}

function updatePricing() {
    const eventSelect = document.getElementById('event');
    const priceField = document.getElementById('price');
    let price = 0;

    switch (eventSelect.value) {
        case 'conference':
            price = 100;
            break;
        case 'workshop':
            price = 50;
            break;
        case 'webinar':
            price = 0;
            break;
    }

    priceField.value = `$${price}`;
}

function updateConfirmationDetails() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const event = document.getElementById('event').value;
    const price = document.getElementById('price').value;

    document.getElementById('confirmationDetails').innerHTML = `
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Event:</strong> ${event}</p>
        <p><strong>Price:</strong> ${price}</p>
    `;
}

function generateQRCode() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const event = document.getElementById('event').value;
    const price = document.getElementById('price').value;

    const qrData = `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nEvent: ${event}\nPrice: ${price}`;
    const qrCodeContainer = document.getElementById('qrCodeContainer');

    // Clear previous QR code
    qrCodeContainer.innerHTML = '';

    try {
        // Create QR code using the qrcode-generator library
        const qr = qrcode(0, 'M');
        qr.addData(qrData);
        qr.make();
        
        // Create an image element
        const img = document.createElement('img');
        img.src = qr.createDataURL(4, 0);
        img.style.width = '200px';
        img.style.height = '200px';
        
        // Add the image to the container
        qrCodeContainer.appendChild(img);
        qrCodeContainer.style.display = 'block';
    } catch (error) {
        console.error('QR Code generation error:', error);
        alert('Error generating QR code. Please try again.');
    }
}

// Form submission handler
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // send the form data to a server
    
    alert('Registration successful! Your QR code has been generated.');
});
