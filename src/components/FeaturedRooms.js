import React, { Component } from 'react';
import {RoomContext} from '../Context';
import Loading from "./Loading";
import Room from "./Room";
import Title from "./Title";
import data from '../data';

export default class FeaturedRooms extends Component {
    //fetches the context
    static contextType = RoomContext;
    
    render() {
        //accesses the fetched context
        let {loading, featuredRooms: rooms} = this.context;
        rooms = rooms.map(room => {
            
            // wrapping the rooms field of data.js in the <Room> tag to access it as a component
            return <Room key = {room.id} room = {room}/>
        })

        return (
            <section className = "featured-rooms">
                <Title title = "Featured Rooms"/>
                <div className = "featured-rooms-center">
                    
                    {/* if loading from context.js is true, show the loading gif, else display the rooms */}
                    {loading ? <Loading/> : rooms}
                </div>
            </section>
        )
    }
}
