
import './App.css';
import React, {useState} from 'react';

function App() {

  const [reps, setReps] = useState();
  const [address, setAddress] = useState();
  const [memberID, setMemberID] = useState("");
  const [details, setDetails] = useState();
  const [bills, setBills] = useState();


  //const [objreps, setObjReps] = useState();
  const objrep = []
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
        objrep.push(...officials);
        var index = 1;
        for(var i = 0; i < offices.length; i++) {
          for(var j = 0; j < offices[i].officialIndices.length; j++){
            var officialIndex = offices[i].officialIndices[j];
            const repRow = <div id={offices[i].officialIndices[j]} onMouseEnter={(event) => detailHandler(event) } 
            onMouseLeave={() => setDetails()} >
              <p>{index}. {offices[i].name}: {officials[officialIndex].name}</p>
            </div>
            representativesArray.push(repRow);
            index++;
          }
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

  // display details based on what the mouse is hovering over
  let detailHandler = (event) => {
    //know when to subtring up to
    var indexOfPeriod = 0
    for(var i = 0; i < (event.target.innerText).length; i++){
      if((event.target.innerText).charAt(i) == '.'){
        indexOfPeriod = i;
        break;
      }
    }

    var index = (event.target.innerText).substring(0,indexOfPeriod) - 1;
    console.log(objrep[index]);
    var person = objrep[index];

    const pic = `${person.photoUrl}`
    var detailRow = <div>
      <h1>{person.name} ({person.party})</h1>
      <img className="profilePic" src={pic} alt="picture no provided" width="300" height="350" ></img>
    </div>
    setDetails(detailRow)
  }


  return (
    <div className="App">
      <h1 className="header"> PoliTX! for HackTX 2020 </h1>
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
