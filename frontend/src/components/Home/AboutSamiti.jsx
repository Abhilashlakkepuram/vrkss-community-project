import { Link } from 'react-router-dom';
import {
  Eye,
  Target,
  Star,
  ArrowRight
} from "lucide-react";

const AboutSamiti = ({ data }) => {
    if (!data) return null

    return (
        <section className="about-samiti">
            <div className="container">
                <div className="about-samiti-inner">
                    <div>
                        {data.about_image ? (
                            <img
                                src={data.about_image}
                                alt={data.about_title}
                                className="about-samiti-img"
                            />
                        ) : (
                            <div className="about-samiti-img-placeholder">🏛️</div>
                        )}
                    </div>
                    <div>
                        <h2 className="section-title">{data.about_title || 'About Samiti'}</h2>
                        {data.about_subtitle && (
                            <p className="section-subtitle">{data.about_subtitle}</p>
                        )}
                        <div className="about-cards">
                            {data.vision && (
                                <div className="about-card">
                                    <span className="about-card-icon"><Eye size={24} strokeWidth={2} /></span>
                                    <div>
                                        <p className="about-card-title">Our Vision</p>
                                        <p className="about-card-text">{data.vision}</p>
                                    </div>
                                </div>
                            )}
                            {data.mission && (
                                <div className="about-card">
                                    <span className="about-card-icon"><Target size={24} strokeWidth={2} /></span>
                                    <div>
                                        <p className="about-card-title">Our Mission</p>
                                        <p className="about-card-text">{data.mission}</p>
                                    </div>
                                </div>
                            )}
                            {data.objectives && (
                                <div className="about-card">
                                    <span className="about-card-icon"><Star size={24} strokeWidth={2} /></span>
                                    <div>
                                        <p className="about-card-title">Our Objectives</p>
                                        <p className="about-card-text">{data.objectives}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        {data.button_name && (
                            <Link
                                to={data.button_link || '/about'}
                                className="btn btn-primary"
                            >
                                {data.button_name}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSamiti