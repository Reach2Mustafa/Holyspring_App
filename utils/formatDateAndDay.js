const formatDateAndDay = (timestamp) => {
    // Parse the timestamp into a Date object
    const dateObject = new Date(timestamp);
  
    // Format the date string (e.g., "May 12, 2024")
    const dateString = dateObject.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  
    // Get the day of the week (e.g., "Wednesday")
    const dayOfWeek = dateObject.toLocaleDateString(undefined, {
      weekday: 'long',
    });
  
    // Format the time string (e.g., "2:43:37 PM")
    const timeString = dateObject.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: 'numeric',
      // second: 'numeric',
      hour12: true, // 12-hour format
    }).toUpperCase();;
  
    return { date: dateString, day: dayOfWeek, time: timeString };
};

export default formatDateAndDay;
