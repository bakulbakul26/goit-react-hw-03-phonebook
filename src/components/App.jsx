import React, { useState, useEffect } from 'react';
import Filter from 'components/filter/Filter';
import ContactForm from './contactform/ContactForm';
import ContactList from './contactlist/ContactList';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      try {
        setContacts(JSON.parse(storedContacts));
      } catch (error) {
        console.error('Error parsing contact from localStorage:0, error');
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
      alert(`${contact.name} is alredy in contact.`);
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
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={addContact} />
      </div>
      <div>
        <h2>Contact</h2>
      </div>

      <Filter filter={filter} onChangeFilter={setFilter} />

      {filteredContacts.length > 0 ? (
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={deleteContact}
        />
      ) : (
        <p>No contacts found</p>
      )}
    </div>
  );
};
