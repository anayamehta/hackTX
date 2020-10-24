
import './App.css';
import React, {useState} from 'react';

function App() {

  const [reps, setReps] = useState();
  const [address, setAddress] = useState();

  const apiKey = "AIzaSyAwjcLpuwIkHOZNdVAkJalXK2fyYSJhBv8";

  const findReps = (userAddress) => {
    userAddress = encodeURI(userAddress)
    const url = `https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=${userAddress}&includeOffices=true&key=${apiKey}`;
    fetch(url)
    .then(response => {return response.json()})
    .then(searchResults => {
      //console.log(searchResults);
      console.log(searchResults.officials[0].name)
    })
    .catch(err => console.log(err))
  }

  let changeAddress = (event) => {
    setAddress(event.target.value);
  }

  //find the representatives based on the value in the address
  let addressChangeHandler = () =>{
    findReps(address);
  }

  return (
    <div className="App">
      <p> Politx! for HackTX 2020 </p>
      <input
        id='address'
        onChange={changeAddress}
        placeholder="Enter your address to know your representatives" />
      <button onClick={addressChangeHandler}>Find my representatives!</button>
      {reps}
    </div>
  );
}

export default App;
