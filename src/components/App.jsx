import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import Filter from './filter/Filter';
import Message from './message/Message';
import css from './App.module.css';

export function App() {
  const [contacts, setContacts] = useState(JSON.parse(window.localStorage.getItem('contacts')) ?? []);
  const [filter, setFilter] = useState('');


  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


  const addContact = ( {name, number} ) => {
    const newContact = { id: nanoid(), name, number };

    contacts.some(contact => contact.name === name)
      ? Report.warning(
          `${name}`,
          'This user is already in the contact list.',
          'OK'
        )
      : setContacts( prevContacts  => [newContact, ...prevContacts]);
  };

  const changeFilter = event => setFilter(event.target.value);

  const filtredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const deleteContact = contactId => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
  };


  return (
    <div className={css.container}>
      <h1 className={css.title}>
        Phonebook
      </h1>
      <ContactForm onSubmit={addContact} />

      <h2 className={css.subtitle}>Contacts</h2>
      <Filter filter={filter} changeFilter={changeFilter} />
      {contacts.length > 0 ? (
        <ContactList
          contacts={filtredContacts()}
          onDeleteContact={deleteContact}
        />
      ) : (
        <Message text="Contact list is empty." />
      )}
    </div> 
  )
}

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//    componentDidMount() {
//     const contacts = localStorage.getItem('contacts')
//     const parsContacts = JSON.parse(contacts)
//     if (parsContacts) {
//       this.setState({contacts: parsContacts})
//     }
    
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
//     }
//   }

//   addContact = ({ name, number }) => {
//     const { contacts } = this.state;
//     const newContact = { id: nanoid(), name, number };

//     contacts.some(contact => contact.name === name)
//       ? Report.warning(
//           `${name}`,
//           'This user is already in the contact list.',
//           'OK'
//         )
//       : this.setState(({ contacts }) => ({
//           contacts: [newContact, ...contacts],
//         }));
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   filtredContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();
//     return contacts.filter(({ name }) =>
//       name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   render() {
//     const { filter } = this.state;
//     const addContact = this.addContact;
//     const changeFilter = this.changeFilter;
//     const filtredContacts = this.filtredContacts();
//     const deleteContact = this.deleteContact;
//     const length = this.state.contacts.length;

//     return (
//       <div className={css.container}>
//         <h1 className={css.title}>
//           Phonebook
//         </h1>
//         <ContactForm onSubmit={addContact} />

//         <h2 className={css.subtitle}>Contacts</h2>
//         <Filter filter={filter} changeFilter={changeFilter} />
//         {length > 0 ? (
//           <ContactList
//             contacts={filtredContacts}
//             onDeleteContact={deleteContact}
//           />
//         ) : (
//           <Message text="Contact list is empty." />
//         )}
//       </div>
//     );
//   }
// }

