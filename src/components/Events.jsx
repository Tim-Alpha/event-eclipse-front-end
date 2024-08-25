import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Events.css';

const Events = ({ venueUUID }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`event/venue/${venueUUID}`, {
                    headers: {
                        'event-token': localStorage.getItem('token')
                    }
                });
                setEvents(response.data.events);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch events');
                setLoading(false);
            }
        };

        fetchEvents();
    }, [venueUUID]);

    const getCurrentDate = () => new Date();
    const getWeekFromNow = () => {
        const now = new Date();
        return new Date(now.setDate(now.getDate() + 7));
    };

    const determineColor = (eventDate) => {
        const date = new Date(eventDate);
        const currentDate = getCurrentDate();
        const oneWeekFromNow = getWeekFromNow();

        if (date < currentDate) {
            return 'past';
        } else if (date <= oneWeekFromNow) {
            return 'current-week';
        } else {
            return 'future';
        }
    };

    const sortedEvents = [...events].sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="events">
            <h2>Upcoming Events</h2>
            {sortedEvents.length > 0 ? (
                <div className="events-grid">
                    {sortedEvents.map((event) => (
                        <div key={event.uuid} className={`event-box ${determineColor(event.eventDate)}`}>
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