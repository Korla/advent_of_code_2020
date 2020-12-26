exports.speakSequence = (sequence) => {
    const whenSpoken = sequence.reduce(
        (spoken, n, i) => ({ ...spoken, [n]: [i] }),
        {}
    );
    let speaking = sequence.slice(-1)[0];
    for (let i = sequence.length; i < 2020; i++) {
        const onlySpokenOnce = whenSpoken[speaking].length === 1;
        if (onlySpokenOnce) {
            speaking = 0;
            whenSpoken[speaking].push(i);
        } else {
            const [a, b] = whenSpoken[speaking].slice(-2);
            speaking = b - a;
            whenSpoken[speaking] = whenSpoken[speaking] || [];
            whenSpoken[speaking].push(i);
        }
    }
    return speaking;
};
