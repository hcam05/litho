// Dependencies //
import React from 'react';
// Components //
import Header from '../components/Header.jsx';
import ResForm from '../components/ResForm.jsx';
// Styles //
import '../styles/App.css';

const Reservation = () => {
  return (
    <div className='app'>
      <Header />
      <br/>
      <ResForm />
    </div>
  )
}   

export default Reservation;
