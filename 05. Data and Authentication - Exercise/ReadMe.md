
# <a name="_hlk13760992"></a>**Exercise: Data and Authentication**
<a name="_hlk65055461"></a>Submit your solutions in the SoftUni judge system at:

<https://judge.softuni.org/Contests/3467/Data-and-Authentication-Exercise>

**Working with Remote Data**

For the solution of some of the following tasks, you will need to use an up-to-date version of the **local REST service**, provided in the lesson’s resources archive. You can [read the documentation here](https://github.com/softuni-practice-server/softuni-practice-server).
1. ## **Messenger**
Write a JS program that records and displays messages. The user can post a message, supplying a name and content and retrieve all currently recorded messages.

**The url** for the requests - **http://localhost:3030/jsonstore/messenger**

When [**Send**] **button** is clicked you should create a **new** **object** and send a **post** **request** to the given url. Use the following message structure:

**{**

`  `**author: authorName,**

`  `**content: msgText,**

**}**

If you click over [**Refresh**] **button** you should **get all** messages with **GET** **request** and display them into the textarea. Use the following message format:
"**{author}: {message}**"
### **Examples**
![](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.001.png)

![](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.002.png)
1. ## **Phonebook**
Write a JS program that can load, create and delete entries from a Phonebook. You will be given an HTML template to which you must bind the needed functionality.

When the **[Load]** button is clicked, a **GET** request should be made to the server to get all phonebook entries. Each  received entry should be in a **li** inside the **ul** with **id="phonebook"** in the following format with text **"<person>: <phone> "** and a **[Delete]** button attached. Pressing the **[Delete]** button should send a **DELETE** request to the server and delete the entry. The received response will be an object in the following format:
**{<key>:{person:<person>, phone:<phone>}, <key2>:{person:<person2>, phone:<phone2>,…}** where **<key>** is an unique key given by the server and **<person>** and **<phone>** are the actual values.

When the **[Create]** button is clicked, a new **POST** request should be made to the server with the information from the Person and Phone textboxes, the Person and Phone textboxes should be cleared and the Phonebook should be automatically reloaded (like if the **[Load]** button was pressed).

**The data sent on a** POST **request should be a valid JSON object, containing properties** person **and** phone. **Example format: 
{**

`  `**"person": "<person>",**

`  `**"phone": "<phone>"**

**}**

The **url** to which your program should make requests is:

**http://localhost:3030/jsonstore/phonebook**

**GET** and **POST** requests should go to **http://localhost:3030/jsonstore/phonebook**, while **DELETE** requests should go to **http://localhost:3030/jsonstore/phonebook/:key>** , where **:key** is the unique key of the entry (you can find out the **key** from the key property in the **GET** request)
### **Screenshots:**
![](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.003.png)![](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.004.png)
1. ## **Students**
Your task is to implement functionality for creating and listing students from a database. Create a new collection called "**students**", 

Each student has:

- **firstName** - **string**, non-empty
- **lastName** - **string**, non-empty
- **facultyNumber** - **string of numbers**, non-empty
- **grade** - **number**, non-empty

You need to write functionality for creating students. When creating a new student, make sure you name the properties accordingly.

You will also need to extract students. You will be given an **HTML template** with a table in it. Create an **AJAX request** that extracts all the students.

URL for this task: **http://localhost:3030/jsonstore/collections/students**

**Screenshots**

![](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.005.png)
1. ## **Book Library**
First task is to "**GET**" all books. To consume the request with **POSTMAN** your **url** should be the **following**: **http://localhost:3030/jsonstore/collections/books**

Using the provided skeleton, write the missing functionalities.

Load all books by clicking the button "LOAD ALL BOOKS"

![Screenshot_5.png](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.006.png)
### **Get Book** 
This functionality is not needed in this task, but you can try it with postman by sending request to "GET" the Book with id:" d953e5fb-a585-4d6b-92d3-ee90697398a0". Send a GET request to this URL:

**http://localhost:3030/jsonstore/collections/books/:id**
### **Create Book**
Write functionality to create a new book, when the submit button is clicked. Before sending the request be sure the fields are not empty (make validation of the input). To **create** a book, you have to send a "**POST**" request and the JSON body should be in the **following** format: 

**{**

`  `**"author": "New Author",**

`  `**"title": "New Title"**

**}**
### **Update Book** 
By clicking the edit button of a book, change the form like this:

![Screenshot_4.png](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.007.png)

The HTTP command "**PUT**" **modifies** an existing HTTP **resource**. The URL is:

**http://localhost:3030/jsonstore/collections/books/:id**

The JSON body should be in the **following** format:

**{**

`  `**"author": "Changed Author",**

`  `**"title": "Changed Title"**

**}**
### **Delete Book** 
By clicking the delete button you have to delete the book, without any confirmation. To delete a book use "**DELETE**" command and send **REQUEST**: [**http://localhost:3030/jsonstore/collections/books/:id**](http://localhost:3030/jsonstore/collections/books/:id)
1. ## **Fisher Game**
Use the provided skeleton and the server.

![](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.008.png)
### **Login User**
The **Login** page contains a form for existing user authentication. By given **username** and **password,** the app should login an existing user.

- After a **successful login** the **home page should be displayed**.
- In case of **error**, an appropriate error **message** should be displayed and the user should be able to fill in the login form again.
- Keep the user data in the browser's **session or locale storage**. 
- Get request: **http://localhost:3030/users/login**

![](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.009.png)

If the user is not logged in, all the buttons should be disabled except the "LOAD" button.
### **Register User**
By given **email** and **password,** the app should register a new user in the system.

- In case of **error** (eg. invalid username/password), an appropriate error **message** should be displayed, and the user should be able to **try** to register again.
- Keep the user data in the browser's **session or local storage**. 
- After a **successful registration** the **home page should be displayed**.
- Post request: **http://localhost:3030/users/register**

![](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.010.png)

### **Logout**
The logout action is available to **logged-in users**. Send the following **request** to perform logout: 

- Get: **http://localhost:3030/users/logout**

Required **headers** are described in the documentation. Upon success, the **REST service** will return an **empty response**. Clear any session information you’ve stored in browser storage.

If the logout was successful, **redirect** the user to the **Home** page and change the button in navigation.
### **Load catches**
By clicking it you have to load all the catches from the server and render them like on the picture:

- Pressing the **[Load]** button should **list all** catches. (For all users)
- Pressing the **[Update]** button should send a **PUT** request, updating the catch in **http://localhost:3030/data/catches/:id**. (**Only for the creator of the catch**) 
- Pressing the **[Delete]** button should delete the catch from **http://localhost:3030/data/catches/:id**. (**Only for the creator of the catch**) 
- Pressing the **[Add]** button should submit a new catch with the values of the inputs in the fieldset with **id="addFrom"**. (**Only for logged in users**)
- Button **[Add]** should be **disabled** in there are no **logged in user**.
- Buttons **[Update]** and **[Delete]** should be **disabled** if the currently logged-in user is not the **author** of the catch.

![](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.011.png)

Each catch should have:

- **angler** - **string** representing the name of the person who caught the fish
- **weight** - **floating-point number** representing the weight of the fish in kilograms
- **species** - **string** representing the name of the fish species
- **location** - **string** representing the location where the fish was caught
- **bait** - **string** representing the bait used to catch the fish
- **captureTime** - **integer number** representing the time needed to catch the fish in minutes

Use the following requests to access your data:

- **List All Catches**
  - Endpoint - **http://localhost:3030/data/catches**
  - Method: **GET**
- **Create a New Catch**
  - Endpoint: **http://localhost:3030/data/catches** 
  - Method: **POST**
  - Request body (JSON): **{"angler":"…", "weight":…, "species":"…", "location":"…", "bait":"…", "captureTime":…}**
- **Update a Catch**
  - Endpoint: **http://localhost:3030/data/catches/:catchId**
  - Method: **PUT**
  - Request body (JSON): **{"angler":"…", "weight":…, "species":"…", "location":"…", "bait":"…", "captureTime":…}**
- **Delete a Catch**
  - Endpoint: **http://localhost:3030/data/catches /:catchId**
  - Method: **DELETE**
1. ## **Furniture \***
Your task is to write the functionality of app, which shows list of furniture. By logged in user there is a possibility to buy furniture and list the bought products of the logged user. Also logged user can create new products (offers).

![Screenshot_6.png](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.012.png)
### **Home page (not logged)**
When the page is loaded the app should list all the furnitures in a table:

![Screenshot_4.png](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.013.png)

The checkbox should be disabled. You can send GET request on the URL: **http://localhost:3030/data/furniture**
### **Auth page**
When "Login" is clicked, the app should redirect to "Login page". There are two possibilities: 

\- to register a new user, send a POST request to the URL: **http://localhost:3030/users/register**

\- to login, send a POST request to the URL: **http://localhost:3030/users/login**

![Screenshot_5.png](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.014.png)
### **Home page (logged in)**
When the **"Create" button is clicked**, add a **new row to the table** for each piece of furniture with **name, price, factor and img**. Send POST request to: **http://localhost:3030/data/furniture**

![Screenshot_7.png](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.015.png)

When the **"Buy"** button is clicked, get all **checkboxes that are marked** and save the information for these orders on the server. Make POST request to: **http://localhost:3030/data/orders**

When the "**All orders**" button is clicked, get all bought furniture of the current user, and show their names and the total price, as shown on the picture: 

![Screenshot_9.png](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.016.png)

This could happen with GET request on this URL: [**http://localhost:3030/data/orders?where=_ownerId%3D{userId}**](http://localhost:3030/data/orders?where=_ownerId%3D%7buserId%7d)
### **Submitting Your Solution**
Place in a **ZIP** file the content of the given resources including your solution. Exclude the **node\_modules** folder if there is one. Upload the archive to Judge.

![](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.017.png)

![Картина, която съдържа текст

Описанието е генерирано автоматично](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.018.png)

![Картина, която съдържа текст

Описанието е генерирано автоматично](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.019.png)




![](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.022.png)![](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.023.png)![](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.024.png)![](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.025.png)![](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.026.png)![](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.027.png)![](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.028.png)![](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.029.png)![](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.030.png)


![](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.020.png)![](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.021.png)![](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.031.png)![](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.032.png)![](Aspose.Words.56d9c6f7-36fe-461e-af5b-417cb80fe7fd.033.png)

