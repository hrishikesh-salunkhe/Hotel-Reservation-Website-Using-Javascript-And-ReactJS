import React from 'react'
import {Link} from 'react-router-dom';
import defaultImage from '../images/room-1.jpeg';
import PropTypes from "prop-types";

export default function Room({room}) {
    const {name, slug, images, price} = room;
    
    return (
        <article className = "room">
            <div className = "img-container">

                {/* if due to some reason the image turns missing in the data.js, it will be fetched from the images folder */}
                <img src = {images[0] || defaultImage} alt = "single room"/>
                <div className = "price-top">
                    <h6> ${price}</h6>
                    <p> per night</p>
                </div>
                <Link to = {`/rooms/${slug}`} className = "btn-primary room-link" />
            </div>
            <p className = "room-info">{name}</p>
        </article>
    )
}


Room.PropType = {
    room: PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        price: PropTypes.number.isRequired,
    }
    )
}