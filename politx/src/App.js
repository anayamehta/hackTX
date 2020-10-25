
import './App.css';
import React, {useState} from 'react';

function App() {

  const [reps, setReps] = useState();
  const [address, setAddress] = useState();
  const [memberID, setMemberID] = useState("");
  const [details, setDetails] = useState();
  const [bills, setBills] = useState();


  const apiKey = "AIzaSyAwjcLpuwIkHOZNdVAkJalXK2fyYSJhBv8";
  const apiKey2 = "Am0fjAIaHBG95NK3x07FU2GWcouY0HD5pVLsw72z";

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
          const repRow = <div key={offices[i].officialIndices[0]} onMouseEnter={() => setDetails("hey")} 
          onMouseLeave={() => setDetails()}>
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

  const findBills = (memberID) => {
    let type = "cosponsored"
    //let memberID =  // member id for Abdnor James (Republican - South Dakota)ssssss
    const url = `https://api.propublica.org/congress/v1/members/${memberID}/bills/${type}.json`;
    fetch(url,{
      headers: {
        "X-API-Key": apiKey2
      }
    })
    .then(response => {return response.json()})
    .then(searchResults => {
      console.log(searchResults)
      let results = searchResults.results[0].bills;
      //array of names of officials in those offices
      // let officials = searchResults.officials;
      var billsArray = [];

      if (results == undefined) {
        billsArray.push("No bills to report.")
      } else {
        for(var i = 0; i < results.length; i++) {
          const billRow = <div key={i}>
            <h3> Bill- {results[i].short_title}: </h3>
            <h6> Latest action date: {results[i].latest_major_action_date} </h6>
            <h6>  Primary Subject: {results[i].primary_subject} </h6>
            <h6>  Still active?: {results[i].active} </h6>
            <h6>  Brief: {results[i].summary} </h6>
            
          </div>
          billsArray.push(billRow);
        }
      }
      //setting reps to list of all representatives' repRows
      setBills(billsArray);

    })
    .catch(err => console.log(err))
  }

  let changeAddress = (event) => {
    setAddress(event.target.value);
  }

  let changeID = (event) => {
    setMemberID(event.target.value);
  }

  //find the representatives based on the value in the address
  let addressChangeHandler = () =>{
    findReps(address);
  }

  let billHandler = () => {
    // john lewis : L000287
    findBills(memberID);
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
      <div className="reps">
        {reps}
      </div>
      <div className="detailsContainer"> 
        Hello World
        <br></br>
        {details}
      </div>
      <input
        id='bills'
        onChange={changeID}
        placeholder="Enter a member ID to get their bills" />
      <button onClick={billHandler}>Find bills!</button>
      <div>
        {bills}
      </div>
    </div>
  );
}

export default App;
