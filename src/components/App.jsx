import React, { useState, useEffect } from 'react';
import ContactForm from 'components/contactform/ContactForm';
import ContactList from 'components/contactlist/ContactList';
import Filter from 'components/filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      try {
        setContacts(JSON.parse(storedContacts));
      } catch (error) {
        console.error('Error parsing contacts from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    const isContactExists = contacts.some(
      c => c.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isContactExists) {
      alert(`${contact.name} is already in contacts.`);
      return;
    }

    setContacts(prevContacts => [...prevContacts, contact]);
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} onChangeFilter={setFilter} />
      {filteredContacts.length > 0 ? (
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={deleteContact}
        />
      ) : (
        <p>No contacts found.</p>
      )}
    </div>
  );
};

export default App;
