import {createClient} from '@sanity/client'
 
export default createClient({
  projectId: "7l9hdg4d", 
  dataset: "production",
  apiVersion: '2021-08-31',
  useCdn: true,
});