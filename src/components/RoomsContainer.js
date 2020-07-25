import React from 'react'
import RoomsFilter from './RoomsFilter';
import RoomsList from './RoomsList';
// import {RoomConsumer} from '../Context';
import Loading from './Loading';
import {withRoomConsumer, RoomConsumer} from "../Context";

// export default function RoomsContainer() {
//     return (

//         // Since RoomConsumer is a function, we can directly start destructing it
//         <RoomConsumer>
//             {
//                 // Since it is a function, you must return a value
//                 (value) => {
//                     const {loading, sortedRooms, rooms} = value
                    
//                     if(loading){
//                         return <Loading/>;
//                     }

//                     return (
//                         <div>
//                             Hello from Rooms Container
//                             <RoomsFilter rooms = {rooms}/>
//                             <RoomsList rooms = {sortedRooms}/>
//                         </div>
//                     );
//                 }
//             }
//         </RoomConsumer>
//     )
// }

//The above code using <RoomConsumer> becomes redundant as we are using a higher order component in Context.js
function RoomsContainer({context}){
    const {loading, sortedRooms, rooms} = context;
    if(loading){
        return <Loading/>;
    }

    return (
        <>
            <RoomsFilter rooms = {rooms}/>
            <RoomsList rooms = {sortedRooms}/>
        </>
    );
}

export default withRoomConsumer(RoomsContainer);