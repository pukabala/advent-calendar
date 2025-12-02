const calendarContent = [];

for (let i = 1; i <= 24; i++) {
    calendarContent.push({
        day: i,
        type: 'image',
        url: `./assets/images/card ${i}.png`, // Note the space in filename
        title: `December ${i}`,
        text: '' // Text is optional since the card image likely has it
    });
}
