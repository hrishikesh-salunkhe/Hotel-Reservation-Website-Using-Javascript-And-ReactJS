import React, { Component } from 'react'
import defaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import {RoomContext} from '../Context';
import Room from '../components/Room';
import StyledHero from '../components/StyledHero';

export default class SingleRoom extends Component {
    
    // This props is being passed by the react router from the Room.js, instead of coming from App.js
    //It can either be accessed by a constructor or the componentDidMount()
    constructor(props){
        super(props);
        this.state = {
            slug: this.props.match.params.slug,
            defaultBcg
        };
    }

    static contextType = RoomContext;

    render() {
        const {getRoom} = this.context;
        const room = getRoom(this.state.slug);
        
        //If the getRoom returns undefined (if wrong parameter is passed in the URL for example), the page will break. This will handle that.
        if(!room){
            return (
                <div className = "error">
                    <h3> No such room could be found... </h3>
                    <Link to = '/rooms' className = "btn-primary"> Back to rooms </Link>
                </div>
            )
        }

        const {name, description, capacity, size, price, extras, breakfast, pets, images} = room

        return (
            
            //Making Hero Component dynamic using styled components: StyledHero
            <>
                <StyledHero img = {images[0] || this.state.defaultBcg}>
                    <Banner title = {`${name} room`}>
                        <Link to = '/rooms' className = 'btn-primary'> Back to Rooms </Link>
                    </Banner>
                </StyledHero>
                <section className = "single-room">

                    {/* Displays all the images of the specific room */}
                    <div className = "single-room-images">
                        {images.map((item, index) => {
                            return <img key = {index} src = {item} alt = {name} />
                        })}
                    </div>
                    <div className = "single-room-info">
                        <article className = "desc">
                            <h3> Details </h3>
                            <p>{description}</p>
                        </article>
                        <article className = "info">
                            <h3> Information </h3>
                            <h6> Price: ${price}</h6>
                            <h6> Size: ${size} sqft</h6>
                            <h6> Max Capacity: {" "}{ capacity > 1 ? `${capacity} people` : `${capacity} person`}</h6>
                            <h6> {pets ? "Pets Allowed" : "No Pets Allowed"}</h6>
                            <h6>{breakfast && "Free Breakfast Included"}</h6>
                        </article>
                    </div>
                </section>
                <section className = "room-extras">
                    <h6> Extras </h6>
                    <ul className = "extras">
                        {extras.map((item, index) => {
                            return <li key = {index}>
                                - {item}
                            </li>
                        })}
                    </ul>
                </section>
            </>
        )
    }
}
