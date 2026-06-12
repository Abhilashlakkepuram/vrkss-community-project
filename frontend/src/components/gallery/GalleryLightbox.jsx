const GalleryLightbox = ({
    photo,
    close,
    prev,
    next
}) => {

    if (!photo) return null;

    return (
        <div
            className="lightbox"
            onClick={close}
        >

            <div
                className="lightbox-content"
                onClick={(e) =>
                    e.stopPropagation()
                }
            >

                <button
                    className="lightbox-close"
                    onClick={close}
                >
                    ✕
                </button>

                <button
                    className="lightbox-arrow left"
                    onClick={prev}
                >
                    ‹
                </button>

                <img
                    src={photo.photo_image}
                    alt={photo.photo_title}
                    className="lightbox-img"
                />

                <button
                    className="lightbox-arrow right"
                    onClick={next}
                >
                    ›
                </button>

                <p>
                    {photo.photo_title}
                </p>

            </div>

        </div>
    );
};

export default GalleryLightbox;