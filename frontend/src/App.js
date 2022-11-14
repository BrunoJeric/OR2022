import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

const client = axios.create({
  baseURL: "http://localhost:3000/castles" 
});

function App() {
  const [castles, setCastles] = useState([])

   useEffect(() => {
      client.get('').then((response) => {
        console.log(response.data)
        setCastles(response.data);
      });
   }, []);

  return (
    <div className="app-container">
      <div>
        <a href="http://localhost:3000/castles/download/csv">download csv</a>
        <br/>
        <a href="http://localhost:3000/castles/download/json">download json</a>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Status</th>
            <th>Founded</th>
            <th>Founder</th>
            <th>Rulers</th>
            <th>Type</th>
            <th>Religion</th>
            <th>FandomURL</th>
            <th>PlacesOfNote</th>
          </tr>
        </thead>
        <tbody>
          {castles.map((castle) => (
            <tr>
              <td>{castle.Name}</td>
              <td>{castle.Location}</td>
              <td>{castle.Status}</td>
              <td>{castle.Founded}</td>
              <td>{castle.Founder.BirthName + ' ' + castle.Founder.FamilyName + ' ' + castle.Founder.Alias}</td>
              <td>{castle.Rulers.map((ruler) => {
                return 'House: ' + ruler.House + ' Sigil: ' + ruler.Sigil
              }).join(', ')}</td>
              <td>{castle.Type}</td>
              <td>{castle.Religion}</td>
              <td>{castle.FandomURL}</td>
              <td>{castle.PlacesOfNote.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
