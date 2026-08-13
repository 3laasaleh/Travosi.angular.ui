export function isQuarterHourTime(value) {
    return typeof value === 'string'
        && /^([01]\d|2[0-3]):(00|15|30|45)$/.test(value.trim());
}
export function hasInvalidItinerary(items, maxDay) {
    return items.some((item) => {
        const dayNumber = Number(item.dayNumber);
        const startMinutes = timeToMinutes(item.startTime);
        const endMinutes = timeToMinutes(item.endTime);
        const children = readChildren(item);
        return !String(item.title ?? '').trim()
            || !Number.isInteger(dayNumber)
            || dayNumber < 1
            || dayNumber > maxDay
            || startMinutes === null
            || endMinutes === null
            || endMinutes <= startMinutes
            || hasInvalidItinerary(children, maxDay);
    });
}
export function hasItineraryTimeOverlap(items) {
    for (let leftIndex = 0; leftIndex < items.length; leftIndex++) {
        const left = items[leftIndex];
        const leftStart = timeToMinutes(left.startTime);
        const leftEnd = timeToMinutes(left.endTime);
        if (leftStart === null || leftEnd === null)
            continue;
        for (let rightIndex = leftIndex + 1; rightIndex < items.length; rightIndex++) {
            const right = items[rightIndex];
            if (Number(left.dayNumber) !== Number(right.dayNumber))
                continue;
            const rightStart = timeToMinutes(right.startTime);
            const rightEnd = timeToMinutes(right.endTime);
            if (rightStart === null || rightEnd === null)
                continue;
            if (leftStart < rightEnd && rightStart < leftEnd)
                return true;
        }
    }
    return items.some((item) => hasItineraryTimeOverlap(readChildren(item)));
}
function readChildren(item) {
    return Array.isArray(item.childs) ? item.childs : [];
}
function timeToMinutes(value) {
    if (!isQuarterHourTime(value))
        return null;
    const [hours, minutes] = String(value).split(':').map(Number);
    return (hours * 60) + minutes;
}
