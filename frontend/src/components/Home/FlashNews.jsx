import { useEffect, useState } from "react";
import { Megaphone } from "lucide-react";

const FlashNews = ({ news }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!news?.length) return;

        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % news.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [news]);

    if (!news?.length) return null;

    const item = news[current];

    const BASE_URL = "http://localhost:5000";

    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith("http")) return path;
        return `${BASE_URL}${path}`;
    };

    return (
        <section className="flash-news">
            <div className="container">

                <div className="flash-news-header">
                    <span className="flash-news-badge">
                        <Megaphone size={18} strokeWidth={2} />
                        FLASH NEWS
                    </span>
                </div>

                <div className="flash-news-card">

                    <div className="flash-news-image">
                        {item.news_image ? (
                            <img
                                src={getImageUrl(item.news_image)}
                                alt={item.news_title}
                            />
                        ) : (
                            <div className="flash-news-placeholder">
                                📰
                            </div>
                        )}
                    </div>

                    <div className="flash-news-content">

                        {item.category && (
                            <span className="flash-news-category">
                                {item.category}
                            </span>
                        )}

                        <h3 className="flash-news-title">
                            {item.news_title}
                        </h3>

                        {item.short_description && (
                            <p className="flash-news-description">
                                {item.short_description}
                            </p>
                        )}

                        {(item.button_name || item.button_link) && (
                            <a
                                href={item.button_link || "#"}
                                className="flash-news-btn"
                            >
                                {item.button_name || "Read More"}
                            </a>
                        )}
                    </div>

                </div>

                <div className="flash-news-dots">
                    {news.map((_, index) => (
                        <button
                            key={index}
                            className={`flash-news-dot ${
                                current === index ? "active" : ""
                            }`}
                            onClick={() => setCurrent(index)}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FlashNews;