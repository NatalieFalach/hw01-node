import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join("db/contacts.json");

async function readContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
}
async function updateContacts(contacts) {
   await fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf-8');
 }

async function listContacts() {
  const contacts = await readContacts();
  console.table(contacts);
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  console.table(contacts.filter((contact) => contact.id === contactId));
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const contactToRemove = contacts.filter((contact) => contact.id === contactId);
  if (contactToRemove.length > 0) {
    const newContacts = contacts.filter(contact => contact.id !== contactId);
    await updateContacts(newContacts);
    console.log("Contact removed");
    console.table(newContacts);
  } else {
    console.log("Contact not found");
   }

}

async function addContact(name, email, phone) {
  const contacts = await readContacts();
  const newContact = { id: nanoid(8), name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);
  console.log("New contact added");
  console.table(contacts);
  return;

}
export { listContacts, getContactById, removeContact, addContact };
