import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { ContactsForm } from './ContactsForm/ContactsForm';
import { ContactsList } from './ContactsList';
import { Filter } from './Filter/Filter';

export function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('Contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  const onContactsFormSubmit = (name, number) => {
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      return alert(`${name} is already in contacts`);
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    setContacts([newContact, ...contacts]);
  };

  const onContactDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const onFilter = text => {
    setFilter(text);
  };

  useEffect(() => {
    window.localStorage.setItem('Contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactsForm onSubmit={onContactsFormSubmit} />
      <h2>Contacts</h2>
      <Filter onFilter={onFilter} />
      <ContactsList
        contacts={contacts}
        filter={filter}
        onDelete={onContactDelete}
      />
    </div>
  );
}
