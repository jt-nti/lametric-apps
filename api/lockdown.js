module.exports = (req, res) => {
    const start = new Date('March 24, 2020 00:00:00');
    const end = new Date('April 07, 2020 00:00:00');
    const now = Date.now();

    const length = end - start;
    const elapsed = length - (end - now);
    const progress = Math.round(elapsed / length * 100);

    const lametricFrames = {
        frames: [
            {
                goalData: {
                    start: 0,
                    current: progress,
                    end: 100,
                    unit: '%'
                },
                icon: 'a36057'
            }
        ]
    }

    res.status(200).json(lametricFrames);
}
