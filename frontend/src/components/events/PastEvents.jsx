const formatDate = (dateStr) => {

    if (!dateStr) return "";

    const d = new Date(dateStr);

    return `${d.getDate()
        .toString()
        .padStart(2, "0")} ${
        d.toLocaleString("default", {
            month: "short"
        }).toUpperCase()
    } ${d.getFullYear()}`;

};

const PastEvents = ({ events }) => {

    if (!events.length) return null;

    return (

        <section className="events-section-block">

            <div className="container">

                <h2 className="section-title center">
                    Past Events
                </h2>

                <div className="past-events-grid">

                    {events.slice(0, 12).map((event) => (

                        <div
                            key={event.event_id}
                            className="past-event-card"
                        >

                            {event.event_image ? (

                                <img
                                    src={event.event_image}
                                    alt={event.event_title}
                                    className="past-event-img"
                                />

                            ) : (

                                <div className="past-event-img-placeholder">
                                    🎉
                                </div>

                            )}

                            <div className="past-event-overlay">

                                <p className="past-event-title">
                                    {event.event_title}
                                </p>

                                <p className="past-event-date">
                                    {formatDate(
                                        event.event_date
                                    )}
                                </p>

                                {event.city && (

                                    <p className="past-event-city">
                                        📍 {event.city}
                                    </p>

                                )}

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

};

export default PastEvents;