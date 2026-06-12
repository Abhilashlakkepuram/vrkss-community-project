import {
    useState,
    useEffect,
    useMemo
} from "react";

import {
    getGalleryCategories,
    getGalleryAlbums,
    getGalleryPhotos,
    getGalleryBanner
} from "../../services/galleryService" ;

import GalleryBanner from "../../components/gallery/GalleryBanner";
import GalleryFilters from "../../components/gallery/GalleryFilters";
import GalleryGrid from "../../components/gallery/GalleryGrid";
import GalleryLightbox from "../../components/gallery/GalleryLightbox";
import PageBanner from "../../components/PageBanner/PageBanner";
import "../../styles/gallery.css";

const Gallery = () => {

    const [banner,setBanner] = useState(null);

    const [categories,setCategories] = useState([]);

    const [albums,setAlbums] = useState([]);

    const [photos,setPhotos] = useState([]);

    const [activeFilter,setActiveFilter] =
        useState("All");

    const [lightbox,setLightbox] =
        useState(null);

    const [lightboxIndex,setLightboxIndex] =
        useState(0);
        useEffect(() => {
    getGalleryCategories()
        .then((res) => {
            console.log("CATEGORIES API", res.data);
            setCategories(res.data.data || []);
        })
        .catch(console.error);
}, []);

    useEffect(() => {

        Promise.all([
            getGalleryBanner(),
            getGalleryCategories(),
            getGalleryAlbums(),
            getGalleryPhotos()
        ])
        .then(
            ([bannerRes,catsRes,albumsRes,photosRes]) => {

                setBanner(
                    bannerRes.data.data
                );

                setCategories(
                    catsRes.data.data
                );

                setAlbums(
                    albumsRes.data.data
                );

                setPhotos(
                    photosRes.data.data
                );
            }
        );

    }, []);

    const filteredPhotos =
        useMemo(() => {

            if (
                activeFilter === "All"
            ) {
                return photos;
            }

            const albumIds =
                albums
                    .filter(
                        album =>
                            album.category_id === activeFilter
                    )
                    .map(
                        album =>
                            album.album_id
                    );

            return photos.filter(
                photo =>
                    albumIds.includes(
                        photo.album_id
                    )
            );

        },[
            activeFilter,
            albums,
            photos
        ]);

    const openLightbox =
        (photo,index) => {

            setLightbox(photo);

            setLightboxIndex(index);

        };

    const prevImage = () => {

        const newIndex =
            (
                lightboxIndex - 1 +
                filteredPhotos.length
            ) %
            filteredPhotos.length;

        setLightboxIndex(newIndex);

        setLightbox(
            filteredPhotos[newIndex]
        );

    };

    const nextImage = () => {

        const newIndex =
            (
                lightboxIndex + 1
            ) %
            filteredPhotos.length;

        setLightboxIndex(newIndex);

        setLightbox(
            filteredPhotos[newIndex]
        );

    };

    return (

        <>

            <PageBanner page="gallery" />

            <section
                className="gallery-filters"
            >

                <div className="container">

                    <GalleryFilters
                        categories={categories}
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                    />

                </div>

            </section>

            <section
                className="gallery-page-section"
            >

                <div className="container">

                    <GalleryGrid
                        photos={filteredPhotos}
                        openLightbox={openLightbox}
                    />

                </div>

            </section>

            <GalleryLightbox
                photo={lightbox}
                close={() =>
                    setLightbox(null)
                }
                prev={prevImage}
                next={nextImage}
            />

        </>

    );
};

export default Gallery;