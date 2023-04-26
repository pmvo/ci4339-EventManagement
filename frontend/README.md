### Sprint 2: Frontend Development
# Data Platform Frontend

This project uses [VueJS 3](https://vuejs.org/) with [Vite](https://vitejs.dev/) and [TailwindCSS](https://tailwindcss.com/).
For form validation [Vuelidate](https://vuelidate-next.netlify.app/) is used.

## Project setup

    npm install
    npm pinia
    npm axios

### Compiles and hot-reloads for development

    npm run dev

# In the web browser, enter http://localhost:5173/ to access the page

## Login
In the Login page, there are two users currently created in the system
1. Editor user: 
- Username: admin
- Password: admin
- Restriction: Can see and access all the views

2. Viewer user:
- Username: viewer
- Password: viewer
- Restriction: Can only see and access to the Dashboard, Find Client, Find Event and Find Service views.
3. Guest user without logging in can only access Dashboard and Login page
* User after logging in will see the 'Welcome, user' and Logout option in the Navigation Panel

## Functions:
1. In the Dashboard, all users can see the bar chart of 'Number of attendees in Events', and a pie chart of 'Number of attendees by Zipcode'

2. Users can create new services in the 'Add Service' view by entering Service Name, Description, and choose Status (Active by default) in a form. 
The newly created services will be listed under the form, inside the 'List of Services'.

3. Users can edit certain service by clicking the Edit button next to the service and will be directed to the Edit Service view.
After editting, users will be redirected back to the 'Add Service' view to see the updates in the 'List of Services'

4. Users can deactivate certain service by clicking the 'Deactivate' button next to the service, and that service status will be changed to 'Inactive'

5. All the services with Active status will be listed in the 'Create Event' view.

### Sprint 3:
### Before startup
You need to either have a local backend running and or use a cloud deployed backend.

Setup a .env file with following variables, e.g.:

    VITE_ROOT_API=http://localhost:3000

VITE_ROOT_API is the URL for the backend API, either on localhost or in the cloud.
