import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AddContactForm } from './components/AddContactForm';

function App(this: any) {
    const [contacts, setContacts] = useState<any>([]);
    const [isCancelled, setIsCancelled] = useState(false);
    const [addContact, setAddContact] = useState(false);
    const [open, setOpen] = useState(false)

    useEffect(() => {
      !isCancelled && getContactInfo();
      return () => {
        setIsCancelled(true);
      }
    }, []);

    const handleDelete = (rowId: any, rowName: any) => {
      let checkId = (val: any) => {
        return (val.id !== rowId && val.name !== rowName)
      }
      let filteredContacts = contacts.filter(checkId)
      console.log(filteredContacts)
      setContacts(filteredContacts)
    }

    const columns = [
      {
        dataField: "name",
        text: "Name",
        sort: true,
        filter: textFilter()
      },
      {
        dataField: "email",
        text: "Email",
        sort: true,
        filter: textFilter()
      },
      {
        dataField: "phone",
        text: "Phone",
        sort: true,
        filter: textFilter()
      },
      {
        dataField: "website",
        text: "Website",
        sort: true,
        filter: textFilter()
      },
      {
        dataField: "remove",
        text: "Controls",
        formatter: (cellContent: any, row: any) => {
          return (
            <button className='btn btn-danger' onClick={() => handleDelete(row.id, row.name)}>Remove</button>
          )
        },
        editable: false,
      }
    ]

    // axios get request to retrieve contact info
    const getContactInfo = () => {
      axios('https://jsonplaceholder.typicode.com/users/')
      .then(res => {
        setContacts(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }

    const handleSubmit = (details: any) => {
      const createId = () => {
        let count = 0
        for (let i = 0; i < contacts.length; i++) {
          count++
        } return count + 1
      }

      setContacts([
        ...contacts,
        { 
          name: details.name,
          email: details.email,
          phone: details.phone,
          website: details.website,
          id: createId(),
        }
      ].sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
      )
    }

    const handleAddContact = () => {
      setAddContact(!addContact)
    }

    return (
      <div className="App">
              <button 
                className={ addContact ? "btn btn-danger" : "btn btn-success"} 
                onClick={() => setAddContact(!addContact)} >{ addContact ? "Cancel" : "Add Contact"}
              </button>
              { 
                addContact && 
                <AddContactForm handleSubmit={handleSubmit} addContact={handleAddContact} />
              }
              <BootstrapTable 
                keyField="id" 
                data={contacts} 
                columns={columns}
                striped
                hover
                condensed
                pagination={paginationFactory()}
                cellEdit={cellEditFactory({
                  mode: "dbclick",
                  blurToSave: true,
                })}
                filter={filterFactory()}
              />
      </div>
    );
}

export default App;
