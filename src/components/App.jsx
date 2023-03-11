import { nanoid } from 'nanoid';
import { Component } from 'react';
import { ContactsForm } from './ContactsForm/ContactsForm';
import { ContactsList } from './ContactsList';
import { Filter } from './Filter/Filter';

const initialContacts = [];

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  onContactsFormSubmit = (name, number) => {
    const existingContact = this.state.contacts.find(
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
    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  onContactDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  onFilter = text => {
    this.setState(() => ({
      filter: text,
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('Contacts');
    if (contacts !== null) {
      const parseContacts = JSON.parse(contacts);
      this.setState({ contacts: parseContacts });
      return;
    }
    this.setState({ contacts: initialContacts });
  }
  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('Contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactsForm onSubmit={this.onContactsFormSubmit} />
        <h2>Contacts</h2>
        <Filter onFilter={this.onFilter} />
        <ContactsList
          contacts={this.state.contacts}
          filter={this.state.filter}
          onDelete={this.onContactDelete}
        />
      </div>
    );
  }
}
