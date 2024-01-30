import delay from '../utils/delay';

class ContactsService {
  async listContacts(orderBy = 'asc') {
    const response = await fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`, {
      method: 'GET',
    });

    await delay(2000);

    return response.json();
  }
}

export default new ContactsService();
