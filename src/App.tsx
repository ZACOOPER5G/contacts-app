import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App(this: any) {
    const [contacts, setContacts] = useState<any>([]);

    useEffect(() => {
      getContactInfo();
    }, []);

    const removeButton = () => {
      return (
        <button onClick={(e) => console.log(e.target)}>Remove</button>
      )
    }

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
      },
      {
        dataField: {removeButton},
        text: "Controls",
        formatter: removeButton,
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
          pagination={paginationFactory()}
        />
      </div>
    );
}

export default App;
