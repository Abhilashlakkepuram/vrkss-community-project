import { Link } from 'react-router-dom'

const QuickServices = ({ services }) => {
    if (!services.length) return null

  return (
        <section className="quick-services">
            <div className="container">
                <h2 className="section-title center" style={{ color: 'var(--text-light)' }}>
                    Quick Services
                </h2>
                <div />
                <div className="services-grid">
                    {services.map(service => (
                        <Link
                            key={service.id}
                            to={service.redirect_url || '#'}
                            className="service-card"
                        >
                            <div className="service-icon">
                                {service.service_icon ? (
                                    <img
                                        src={service.service_icon}
                                        alt={service.service_name}
                                        style={{ width: 32, height: 32, objectFit: 'contain' }}
                                    />
                                ) : '⚡'}
                            </div>
                            <p className="service-name">{service.service_name}</p>
                            {service.short_description && (
                                <p className="service-desc">{service.short_description}</p>
                            )}
                            <span className="service-link">View More →</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default QuickServices