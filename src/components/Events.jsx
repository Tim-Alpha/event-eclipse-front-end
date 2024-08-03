import React from 'react';
import './Events.css';

const Events = ({ events }) => {
    if (!events.length) {
        return <div>No upcoming events.</div>;
    }

    return (
        <div className="events">
            <h2>Upcoming Events</h2>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        <h3>{event.name}</h3>
                        <p>{event.date}</p>
                        <p>{event.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Events;
