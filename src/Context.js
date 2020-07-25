import React, { Component } from 'react';

//No need to import local data after implementing Contentful API
//import items from './data';

import Client from './Contentful';

const RoomContext = React.createContext();

export default class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    };

    //Getting data from Contentful API:
    getData = async () => {
        try{
            let response = await Client.getEntries({
                
                //This is the Contentful content type created:
                content_type: "beachResortRoom",

                //Ordering items using Contentful's order query:
                order: "fields.price"
            });
            
            //Moved from componentDidMount after implementing Contentful API:
            let rooms = this.formatData(response.items);
            let featuredRooms = rooms.filter(room => room.featured === true);
            let maxPrice = Math.max(...rooms.map(item => item.price));
            let maxSize = Math.max(...rooms.map(item => item.size));

            this.setState({
                
                //No need to write rooms: rooms since both have the same name
                rooms,
                featuredRooms,
                sortedRooms: rooms, 
                loading: false,
                price: maxPrice,
                maxPrice, 
                maxSize
            })
        }
        catch(error){
            console.log(error);
        }
    } 
    
    componentDidMount(){
        this.getData()
        
        //All this gets shifted to getData function when we move the data from Contentful API instead of doing it locally:
        
        // let rooms = this.formatData(items);
        // let featuredRooms = rooms.filter(room => room.featured === true);
        // let maxPrice = Math.max(...rooms.map(item => item.price));
        // let maxSize = Math.max(...rooms.map(item => item.size));

        // this.setState({
            
        //     //No need to write rooms: rooms since both have the same name
        //     rooms,
        //     featuredRooms,
        //     sortedRooms: rooms, 
        //     loading: false,
        //     price: maxPrice,
        //     maxPrice, 
        //     maxSize
        // })
    }

    formatData(items){
        let tempItems = items.map(item => {
            let id = item.sys.id
            let images = item.fields.images.map(image => image.fields.file.url);

            let room = {...item.fields, images, id}
            return room;
        });
        return tempItems;
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find((room) => room.slug === slug);
        return room;
    }

    //Will take the inputs and change the values in the state
    handleChange = event => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked: target.value
        const name = event.target.name

        //Will change the name of type depending on the type you select in the filter menu
        this.setState({
                [name]: value
            },
            this.filterRooms
        );
    }

    filterRooms = () => {
        
        //Using let instead of const because we need to change the values in this function
        let {

            //rooms and not sorted rooms because sorted rooms will be changed based on the filter menu input
            rooms,
            type,
            capacity,
            price,
            minSize,
            maxSize,
            breakfast,
            pets
        } = this.state;
    
        let tempRooms = [...rooms];

        //Type Filter:
        //If type selected is "all", dont filter the rooms; else filter according to the type
        if (type !== 'all'){
            tempRooms = tempRooms.filter(room => room.type === type);
        }

        //To pass capacity as a number instead of default string type
        capacity = parseInt(capacity);

        //Capacity Filter:  ..(Room capacity >= filter capacity)
        if(capacity !== 1){
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        }

        //To pass capacity as a number instead of default string type
        price = parseInt(price);

        //Price Filter:  ..(Room price <= filter price)
        tempRooms = tempRooms.filter(room => room.price <= price)

        //Size Filter:
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)

        //Breakfast Filter:
        if(breakfast){
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        }

         //Pets Filter:
         if(pets){
            tempRooms = tempRooms.filter(room => room.pets === true)
        }

        //Change state according to the filter inputs:
        this.setState({
            sortedRooms: tempRooms
        })

    }

    render() {
        return (
            <RoomContext.Provider 
                value = {{
                    ...this.state,
                    getRoom: this.getRoom,
                    handleChange: this.handleChange
            }}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export {RoomProvider, RoomConsumer, RoomContext};

//Higher order component: since it returns another component
export function withRoomConsumer(Component){
    return function ConsumerWrapper(props){
        return <RoomConsumer>
                    {value => <Component {...props} context = {value}/>}
                </RoomConsumer>
    }
}