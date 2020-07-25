import styled from 'styled-components';
import defaultImage from '../images/room-1.jpeg';

const orange = '#1f5025'

//The styling is copied from .roomHero in App.css since we have to do the same thing for each Hero
//USP of styled components: It can access props
const StyledHero = styled.header`
    min-height: 60vh;
    background: url(${props => props.img ? props.img : defaultImage}) center/cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    `;

export default StyledHero;