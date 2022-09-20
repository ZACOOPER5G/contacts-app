import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { MDBTable } from 'mdb-react-ui-kit';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AddContactForm } from './components/AddContactForm';

function App(this: any) {
    const [contacts, setContacts] = useState<any>([]);
    const [isCancelled, setIsCancelled] = useState(false);
    const [addContact, setAddContact] = useState(false);

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

    useEffect(() => {
      !isCancelled && getContactInfo();
      return () => {
        setIsCancelled(true);
      }
    }, [isCancelled]);

    const handleDelete = (rowId: number) => {
      let checkId = (val: any) => {
        return (val.id !== rowId)
      }
      setContacts(contacts.filter(checkId))
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
        text: "Remove Contact",
        formatter: (cellContent: string, row: any) => {
          return (
            <button className='btn btn-danger' onClick={() => {
              handleDelete(row.id)
            }}>Remove</button>
          )
        },
        editable: false,
      }
    ]

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
                className={ addContact ? "btn btn-dark" : "btn btn-success"} 
                onClick={() => setAddContact(!addContact)} >{ addContact ? "Cancel" : "Add Contact"}
              </button>
              { 
                addContact && 
                <AddContactForm handleSubmit={handleSubmit} addContact={handleAddContact} />
              }
              <MDBTable responsive>
                <BootstrapTable 
                  keyField="id" 
                  remote={true}
                  handleDelete={true}
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
                  deleteRow={true}
                />
              </MDBTable>
      </div>
    );
}

export default App;
