import BootstrapTable from 'react-bootstrap-table-next'
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
    const [contacts, setContacts] = useState<any>([]);

    useEffect(() => {
      getContactInfo();
    }, []);

    const columns = [
      {
      dataField: "name",
      text: "Name",
      sort: true
      },
      {
        dataField: "email",
        text: "Email",
        sort: true
      },
      {
        dataField: "phone",
        text: "Phone",
        sort: true
      },
      {
        dataField: ["address.city"],
        text: "City",
        sort: true
      },
      {
        dataField: "website",
        text: "Website",
        sort: true
      }
    ]

    // axios get request to retrieve contact info
    const getContactInfo = () => {
      axios.get('https://jsonplaceholder.typicode.com/users/')
      .then(res => {
        setContacts(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }

    return (
      <div className="App">
        <BootstrapTable 
          keyField="id" 
          data={contacts} 
          columns={columns}
          striped
          hover
          condensed
        />
      </div>
    );
}

export default App;
