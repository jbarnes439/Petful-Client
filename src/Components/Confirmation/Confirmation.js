import React from 'react';
import './Confirmation.css';

const Confirmation = (props) => {

    return (
        <div className='confirmation-card'>
            <section>
                <h4>Congratulations on your new family member {props.adopter}!</h4>
            </section>            
        </div>
    )
}

export default Confirmation;