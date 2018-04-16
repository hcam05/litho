// Dependencies //
import React from 'react';

// Styles //
import '../styles/ResForm.css';

class ResForm extends React.Component {

  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(stringifyFormData(data));
    fetch('/reservation', {
      method: 'POST',
      body: stringifyFormData(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  render() {
    return (
      <form className='res-form' onSubmit={this.handleSubmit} >
        <label className='res-form-fields' htmlFor='name'>
          Name: &nbsp; <input type="text" id="name" name="name" required minlength="3"/>
        </label>
        <label className='res-form-fields' htmlFor='hotelName'>
          Hotel: &nbsp;
          <select id="hotelName" name="hotelName">
            <option value="Rancho Relaxo">Rancho Relaxo</option>
            <option value="Springfield Arms Hotel">Springfield Arms Hotel</option>
            <option value="Springfield Four Seasons">Springfield Four Seasons</option>
            <option value="The Benny Hilton">The Benny Hilton</option>
            <option value="Ye Olde Off Ramp Inn">Ye Olde Off Ramp Inn</option>
          </select>
        </label>
        <label className='res-form-fields' htmlFor='hotelName'>
          Arrival Date: &nbsp; <input type="date" id="arrivalDate" name="arrivalDate" required/>
        </label>
        <label className='res-form-fields' htmlFor='hotelName'>
          Departure Date: &nbsp; <input type="date" id="departureDate" name="departureDate" required/>
        </label>
        <span className='button-container'>
          <button className='button'>
            Submit
          </button>
        </span>
      </form>
    )
  }
}

const stringifyFormData = (formData) => {
  const data = {};
  for (let key of formData.keys()) {
    data[key] = formData.get(key);
  }
  return JSON.stringify(data, null, 2);
}

export default ResForm;
