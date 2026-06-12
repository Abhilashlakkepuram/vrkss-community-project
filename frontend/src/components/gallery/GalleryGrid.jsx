const GalleryGrid = ({
    photos,
    openLightbox
}) => {
    if (!photos.length) {

        return (
            <div className="events-empty">
                No Photos Found
            </div>
        );

    }

    return (
        <div className="gallery-masonry">

            {photos.map((photo, index) => (

                <div
                    key={photo.photo_id}
                    className="gallery-masonry-item"
                    onClick={() =>
                        openLightbox(
                            photo,
                            index
                        )
                    }
                >

                    <img
                        src={photo.photo_image}
                        alt={photo.photo_title}
                        className="gallery-masonry-img"
                    />

                    <div className="gallery-masonry-overlay">

                        <h4>
                            {photo.photo_title}
                        </h4>

                    </div>

                </div>

            ))}

        </div>
    );
};

export default GalleryGrid;