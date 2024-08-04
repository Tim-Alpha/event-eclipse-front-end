import React from 'react';
import './Events.css';

const Events = ({ events }) => {
    const getCurrentDate = () => new Date();
    const getWeekFromNow = () => {
        const now = new Date();
        return new Date(now.setDate(now.getDate() + 7));
    };

    const determineColor = (endTime) => {
        const eventDate = new Date(endTime);
        const currentDate = getCurrentDate();
        const oneWeekFromNow = getWeekFromNow();

        if (eventDate < currentDate) {
            return 'past';
        } else if (eventDate <= oneWeekFromNow) {
            return 'current-week';
        } else {
            return 'future';
        }
    };

    const sortedEvents = [...events].sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));

    return (
        <div className="events">
            <h2>Upcoming Events</h2>
            {sortedEvents.length > 0 ? (
                <div className="events-grid">
                    {sortedEvents.map((event) => (
                        <div key={event.uuid} className={`event-box ${determineColor(event.endTime)}`}>
                            <h3>{event.name}</h3>
                            <p>Date: {new Date(event.eventDate).toLocaleDateString()}</p>
                            <p>{event.description}</p>
                            <p>Start Time: {new Date(event.startTime).toLocaleTimeString()}</p>
                            <p>End Time: {new Date(event.endTime).toLocaleTimeString()}</p>
                            <div className="user-info">
                                <img src={event.user.profileUrl} alt={`${event.user.firstName} ${event.user.lastName}`} />
                                <p>Organizer: {event.user.firstName} {event.user.lastName}</p>
                                <p>Email: {event.user.email}</p>
                                <p>Mobile: {event.user.mobile}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No upcoming events.</p>
            )}
        </div>
    );
};

export default Events;
