import React from 'react';
import {useContext} from 'react';
import {RoomContext} from "../Context";
import Title from "../components/Title";

//Get all unique values to use in the menu
const getUnique = (items, value) => {
    
    // item[value] will check the value string for it's type and if it's not present in the Set it will return it, if it is present in the Set it wont return
    return [...new Set(items.map(item => item[value]))]
}

export default function RoomsFilter({rooms}) {
    const context = useContext(RoomContext);
    
    const {
        handleChange,
        type,
        capacity,
        price,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets
    } = context;

    //Get unique types
    let types = getUnique(rooms, 'type');

    //Add all as the first type in types menu
    types = ['all', ...types]

    // Map to JSX
    types = types.map((item, index) => {
        return <option value = {item} key = {index}>{item}</option>
    })

    //Get unique capacities
    let people = getUnique(rooms, 'capacity');

    // Map to JSX
    people = people.map((item, index) => { 
        return(
            <option key = {index} value = {item}>
                {item}
            </option>
        ) 
    })

    return (
        <section className = "filter-container">
            <Title title = "Search rooms"/>
            <form className = "filter-form">
                {/* start select type */}
                <div className = "form-group">
                    <label htmlFor = "type">
                        Room type
                    </label>
                    <select 
                        name = "type" 
                        id = "type" 
                        value = {type} 
                        className = "form-control" 
                        onChange = {handleChange}
                    >
                        {types}
                    </select>   
                </div>
                {/* end select type */}
                {/* start select capacity */}
                <div className = "form-group">
                    <label htmlFor = "capacity">
                        Guests
                    </label>
                    <select 
                        name = "capacity" 
                        id = "capacity" 
                        value = {capacity} 
                        className = "form-control" 
                        onChange = {handleChange}
                    >
                        {people}
                    </select>   
                </div>
                {/* end select capacity */}
                {/* start select price */}
                <div className = "form-group">
                    <label htmlFor = "price">
                        Room price: ${price}
                    </label>
                    <input 
                        type = "range" 
                        name = "price" 
                        min = {minPrice} 
                        max = {maxPrice} 
                        id = "price"
                        value = {price}
                        onChange = {handleChange}
                        className = "form-control"
                    />
                </div>
                {/* end select price */}
                {/* start select size */}
                <div className = "form-group">
                    <label htmlFor = "size">
                        Room size
                    </label>
                    <div className = "size-inputs">
                        <input 
                            type = "number" 
                            name = "minSize" 
                            id = "size" 
                            value = {minSize} 
                            onChange = {handleChange} 
                            className = "size-input"
                        />
                        <input 
                            type = "number" 
                            name = "maxSize" 
                            id = "size" 
                            value = {maxSize} 
                            onChange = {handleChange} 
                            className = "size-input"
                        />
                    </div>
                </div>
                {/* end select size */}
                {/* start select extras */}
                <div className = "form-group">
                    <div className = "single-extra">
                        <input 
                            type = "checkbox"
                            name = "breakfast"
                            id = "breakfast"
                            checked = {breakfast}
                            onChange = {handleChange}
                        />
                        <label htmlFor = "breakfast">
                            Breakfast
                        </label>
                    </div>
                    <div className = "single-extra">
                        <input 
                            type = "checkbox"
                            name = "pets"
                            id = "pets"
                            checked = {pets}
                            onChange = {handleChange}
                        />
                        <label htmlFor = "pets">
                            Pets
                        </label>
                    </div>
                </div>
                {/* end select extras */}
            </form>
        </section>
    )
}
