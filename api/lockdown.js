module.exports = (req, res) => {
    const start = new Date('March 24, 2020 00:00:00');
    const end = new Date('April 07, 2020 00:00:00');
    const now = Date.now();

    const length = end - start;
    const elapsed = length - (end - now);
    const progress = Math.round(elapsed / length * 100);

    const titleFrame = {
        text: 'Lockdown',
        icon: 'a36057',
        index: null
    };

    const dayFrame = {
        text: 'Wed',
        icon: 'i1324',
        index: null
    };

    const progressFrame = {
        goalData: {
            start: 0,
            current: progress,
            end: 100,
            unit: '%'
        },
        icon: 'a36057',
        index: null
    };

    const lametricResponse = {
        frames: []
    };

    if (req.query.display) {
        if (req.query.display.includes('Title')) {
            lametricResponse.frames.push(titleFrame);
        }
        if (req.query.display.includes('Day')) {
            lametricResponse.frames.push(dayFrame);
        }
        if (req.query.display.includes('Progress')) {
            lametricResponse.frames.push(progressFrame);
        }
    } else {
        lametricResponse.frames.push(progressFrame);
    }

    lametricResponse.frames.forEach(function(frame, index){
        frame.index = index;
    });

    res.status(200).json(lametricResponse);
}
