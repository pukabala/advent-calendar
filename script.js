document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('calendar-grid');
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.getElementById('close-modal');

    // State management
    const openedDoors = JSON.parse(localStorage.getItem('adventCalendarOpened')) || [];

    // Current date logic
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0-11 (11 is December)
    const currentDay = currentDate.getDate();

    // Helper to check if a door is locked
    function isDoorLocked(day) {
        // Only unlock in December (month 11)
        if (currentMonth !== 11) {
            return true;
        }
        return day > currentDay;
    }

    // Render the grid
    calendarContent.forEach(item => {
        const doorContainer = document.createElement('div');
        doorContainer.classList.add('door-container');

        const doorImg = document.createElement('img');
        doorImg.src = `./assets/images/door ${item.day}.png`;
        doorImg.alt = `Door ${item.day}`;
        doorImg.classList.add('door-img');

        const width = 50 + (item.day - 1) * 6;
        doorImg.style.width = `${width}px`;

        const isLocked = isDoorLocked(item.day);
        const isOpen = openedDoors.includes(item.day);

        if (isLocked) {
            doorImg.classList.add('locked');
            doorContainer.addEventListener('click', () => {
                alert(`This door will open on December ${item.day}!`);
            });
        } else {
            if (isOpen) {
                doorImg.classList.add('open');
            }

            doorContainer.addEventListener('click', () => {
                openDoor(item, doorImg);
            });
        }

        doorContainer.appendChild(doorImg);
        grid.appendChild(doorContainer);
    });

    // Add Stump at the bottom
    const stumpContainer = document.createElement('div');
    stumpContainer.classList.add('door-container');
    const stumpImg = document.createElement('img');
    stumpImg.src = './assets/images/stump.png'; // Make sure this file exists!
    stumpImg.alt = 'Tree Stump';
    stumpImg.classList.add('door-img', 'stump');

    stumpImg.style.width = '55px';

    // Stump is usually static, but can be interactive if desired
    stumpContainer.appendChild(stumpImg);
    grid.appendChild(stumpContainer);

    function openDoor(item, doorElement) {
        // Visual update
        doorElement.classList.add('open');

        // Persist state
        if (!openedDoors.includes(item.day)) {
            openedDoors.push(item.day);
            localStorage.setItem('adventCalendarOpened', JSON.stringify(openedDoors));
        }

        // Show content
        showModal(item);
    }

    function showModal(item) {
        // Simplified modal: Just the image, no text, no title
        let contentHtml = '';

        if (item.type === 'image') {
            contentHtml += `<img src="${item.url}" alt="Day ${item.day}" class="modal-card-img">`;
        } else {
            contentHtml += `<p>${item.text}</p>`;
        }

        modalBody.innerHTML = contentHtml;
        modal.classList.remove('hidden');
    }

    // Close modal logic
    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
});
