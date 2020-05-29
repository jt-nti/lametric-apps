module.exports = (req, res) => {
    const alertLevel = 4;
    const start = new Date('March 24, 2020 00:00:00');
    const end = new Date('June 19, 2020 00:00:00');
    const now = new Date();

    const length = end.getTime() - start.getTime();
    const elapsed = length - (end.getTime() - now.getTime());
    const progress = Math.min(99, Math.round(elapsed / length * 100));
    const dayNumber = Math.ceil(elapsed / 86400000);
    const weekNumber = Math.ceil(elapsed / 604800000);

    const titleFrame = {
        text: 'UK Lockdown',
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
            icon: 'i36139',
            index: null
        },
        {
            text: 'Tuesday',
            icon: 'i36140',
            index: null
        },
        {
            text: 'Wed',
            icon: 'i1324',
            index: null
        },
        {
            text: 'Thurs',
            icon: 'i2722',
            index: null
        },
        {
            text: 'Friday',
            icon: 'i8145',
            index: null
        },
        {
            text: 'Sat',
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

    const dayNumberFrame = {
        text: `Day ${dayNumber}`,
        icon: 'a36057',
        index: null
    };

    const weekNumberFrame = {
        text: `Week ${weekNumber}`,
        icon: 'a36057',
        index: null
    };

    const alertFrames = [
        {
            text: 'Low',
            icon: 'i37495',
            index: null
        },
        {
            text: 'Moderate',
            icon: 'i37494',
            index: null
        },
        {
            text: 'Substantial',
            icon: 'i37493',
            index: null
        },
        {
            text: 'Severe',
            icon: 'i37492',
            index: null
        },
        {
            text: 'Critical',
            icon: 'i37491',
            index: null
        }
    ];

    const lametricResponse = {
        frames: []
    };

    if (req.query.display) {
        const displayOptions = req.query.display.replace('%20', ' ').split(',');

        if (displayOptions.includes('Title')) {
            lametricResponse.frames.push(titleFrame);
        }
        if (displayOptions.includes('Day') || displayOptions.includes('Emoji day')) {
            // TODO worry about daylight savings?
            const day = now.getUTCDay();
            lametricResponse.frames.push(dayFrames[day]);
        }
        if (displayOptions.includes('Progress')) {
            lametricResponse.frames.push(progressFrame);
        }
        if (displayOptions.includes('Total') || displayOptions.includes('Day number')) {
            lametricResponse.frames.push(dayNumberFrame);
        }
        if (displayOptions.includes('Week number')) {
            lametricResponse.frames.push(weekNumberFrame);
        }
        if (displayOptions.includes('Alert level')) {
            lametricResponse.frames.push(alertFrames[alertLevel - 1]);
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
