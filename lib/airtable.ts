import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID!);

export const contactFormTable = base('ContactForm');
export const servicesTable = base('Services');

export default base;