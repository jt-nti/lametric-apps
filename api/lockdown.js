module.exports = (req, res) => {
    const start = new Date('March 24, 2020 00:00:00');
    const end = new Date('April 07, 2020 00:00:00');
    const now = new Date();

    const length = end.getTime() - start.getTime();
    const elapsed = length - (end.getTime() - now.getTime());
    const progress = Math.round(elapsed / length * 100);

    const titleFrame = {
        text: 'Lockdown',
        icon: 'a36057',
        index: null
    };

    const dayFrames = [
        {
            text: 'Sunday',
            icon: 'i8953',
            index: null
        },
        {
            text: 'Monday',
            icon: 'i1489',
            index: null
        },
        {
            text: 'Tuesday',
            icon: 'i1489',
            index: null
        },
        {
            text: 'Wed',
            icon: 'i1324',
            index: null
        },
        {
            text: 'Thursday',
            icon: 'i2722',
            index: null
        },
        {
            text: 'Friday',
            icon: 'i8145',
            index: null
        },
        {
            text: 'Saturday',
            icon: 'i6916',
            index: null
        }
    ];

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
            // TODO worry about daylight savings?
            const day = now.getUTCDay();
            lametricResponse.frames.push(dayFrames[day]);
        }
        if (req.query.display.includes('Progress')) {
            lametricResponse.frames.push(progressFrame);
        }
    }
    
    if (lametricResponse.frames.length < 1) {
        lametricResponse.frames.push(progressFrame);
    }

    // TODO should the index be fixed?
    lametricResponse.frames.forEach(function(frame, index){
        frame.index = index;
    });

    res.status(200).json(lametricResponse);
}
