
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
      //array of all offices
      let offices = searchResults.offices;
      //array of names of officials in those offices
      let officials = searchResults.officials;
      var representativesArray = [];

      if (offices == undefined) {
        representativesArray.push("Invalid address")
      } else {
        for(var i = 0; i < offices.length; i++) {
          const repRow = <div key={offices[i].officialIndices[0]}>
            <p>{i + 1}. {offices[i].name}: {officials[i].name}</p>
          </div>
          representativesArray.push(repRow);
        }
      }
      //setting reps to list of all representatives' repRows
      setReps(representativesArray);

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
      <p> PoliTX! for HackTX 2020 </p>
      <input
        id='address'
        onChange={changeAddress}
        placeholder="Enter your address to know your representatives" />
      <button onClick={addressChangeHandler}>Find my representatives!</button>
      <br></br>
      {reps}
    </div>
  );
}

export default App;
