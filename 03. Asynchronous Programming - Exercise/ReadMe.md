
**Exercise: Asynchronous Programming**

Submit your solutions in the SoftUni judge system at:

<https://judge.softuni.org/Contests/3466/Asynchronous-Programming-Exercise>

**Working with Remote Data**

For the solution of some of the following tasks, you will need to use an up-to-date version of the **local REST service**, provided in the lessonТs resources archive. You can [read the documentation here](https://github.com/softuni-practice-server/softuni-practice-server).
1. ## **Bus Stop**
Write a JS program that displays arrival times for all buses by a given bus stop ID when a button is clicked. Use the skeleton from the provided resources.

When the button with ID **'submit'** is clicked, the name of the bus stop appears and the list bellow gets filled with all the buses that are expected and their time of arrival. Take the **value** of the input field with id **'stopId'**. Submit a **GET** request to **http://localhost:3030/jsonstore/bus/businfo/:busId** (replace the highlighted part with the correct value) and parse the response. You will receive a JSON object in the format:

**stopId: {**

`  `**name: stopName,**

`  `**buses: { busId: time, Е }**

**}**

Place the name property as text inside the div with ID **'stopName'** and each bus as a list item with text:

**"Bus {busId} arrives in {time} minutes"**

Replace all highlighted parts with the relevant value from the response. If the request is not successful, or the information is not in the expected format, display **"Error"** as **stopName** and nothing in the list. The list should be cleared before every request is sent.

**Note:** The service will respond with valid data to IDs 1287, 1308, 1327 and 2334.

See examples on the next page.
### **Examples**
![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.001.png)

![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.002.png)

When the button is clicked, the results are displayed in the corresponding elements:

![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.003.png)

![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.004.png)

If an error occurs, the stop name changes to Error:

![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.005.png)

![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.006.png)
1. ## **Bus Schedule**
Write a JS program that tracks the progress of a bus on itТs route and announces it inside an info box. The program should display which is the upcoming stop and once the bus arrives, to request from the server the name of the next one. Use the skeleton from the provided resources.

The bus has two states Ц **moving** and **stopped**. When it is **stopped**, only the button У**Depart**Ф is **enabled**, while the info box shows the name of the **current** stop. When it is **moving**, only the button У**Arrive**Ф is **enabled**, while the info box shows the name of the **upcoming** stop. Initially, the info box shows "**Not Connected**" and the "**Arrive**" button is **disabled**. The ID of the first stop is "**depot**".

When the "**Depart**" button is clicked, make a **GET** request to the server with the ID of the current stop to address **http://localhost:3030/jsonstore/bus/schedule/:id** (replace the highlighted part with the relevant value). As a response, you will receive a JSON object in the following format:

**stopId {**

`  `**name: stopName,**

`  `**next: nextStopId**

**}**

Update the info box with the information from the response, disable the УDepartФ button and enable the УArriveФ button. The info box text should look like this (replace the highlighted part with the relevant value):

**Next stop {stopName}**

When the "**Arrive**" button is clicked, update the text, disable the УArriveФ button and enable the УDepartФ button. The info box text should look like this (replace the highlighted part with the relevant value):

**Arriving at {stopName}**

Clicking the buttons successfully will cycle through the entire schedule. If invalid data is received, show "**Error**" inside the info box and **disable** both buttons.
### **Examples**
Initially, the info box shows "Not Connected" and the arrive button is disabled.

![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.007.png)

![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.008.png)

When Depart is clicked, a request is made with the first ID. The info box is updated with the new information and the buttons are changed:

![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.009.png)

![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.010.png)

Clicking Arrive, changes the info box and swaps the buttons. This allows Depart to be clicked again, which makes a new request and updates the information:

![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.011.png)

![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.012.png)
1. ## **Forecaster**
Write a program that **requests** a weather report **from a** **server** and **displays** it to the user.

Use the skeleton from the provided resources.

When the user writes the name of a location and clicks У**Get Weather**Ф, make a **GET** request to the server at address **http://localhost:3030/jsonstore/forecaster/locations**. The response will be an array of objects, with the following structure:

**{** 

`  `**name: locationName,**

`  `**code: locationCode**

**}**

Find the object, corresponding to the name that the user submitted in the input field with ID "**location**" and use its **code** value to make **two more GET requests**:

- For current conditions, make a request to:

**http://localhost:3030/jsonstore/forecaster/today/:code**

The response from the server will be an object with the following structure:

**{** 

`  `**name: locationName,**

`  `**forecast: { low: temp,**

`              `**high: temp,**

`              `**condition: condition }** 

**}**

- For a 3-day forecast, make a request to: 

**http://localhost:3030/jsonstore/forecaster/upcoming/:code**

The response from the server will be an object with the following structure:

**{** 

`  `**name: locationName,**

`  `**forecast: [{ low: temp,**

`               `**high: temp,**

`               `**condition: condition }, Е ]** 

**}**

Use the information from these two objects to compose a forecast in HTML and insert it inside the page. Note that the **<div>** with ID "**forecast**" must be set to **visible**. See the examples for details. 

If an **error** occurs (the server doesnТt respond or the location name cannot be found) or the data is not in the correct format, display "**Error**" in the **forecast section**.

Use the following codes for weather symbols:

- Sunny			**&#x2600;** // ?
- Partly sunny	             **&#x26C5;** // ?
- Overcast		**&#x2601;** // ?
- Rain			**&#x2614;** // ?
- Degrees		**&#176;**   // ∞

**Examples**

When the app starts, the **forecast div** is **hidden**. When the user **enters a name** and **clicks** on the button **Get Weather**, the requests being.

![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.013.png)

![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.014.png)

![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.015.png)

![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.016.png)
1. ## **Locked Profile**
In this problem, you must **create a JS program** which **shows** and **hides** the additional information about users, which you can find by making a **GET** request to the server at address:

**http://localhost:3030/jsonstore/advanced/profiles**

The response will be an object with the information for all users. Create a profile card for every user and display it on the web page. Every item should have the following structure:

![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.017.png)

![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.018.png)

When one of the [**Show more**] **buttons** is clicked, the **hiden information** inside the div should be shown, only if **the profile is not locked**! If the current profile is **locked,** nothing should happen.

![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.019.png)

If the **hidden information is displayed** and we **lock** **the profile again**, the [**Hide it**] button should **not be working**! Otherwise, when the profile is **unlocked** and we click on the **[Hide it]** button, the new fields must hide again.
1. ## **Accordion**
An **html** file is given and your task is to show **more**/**less** information for the selected article. At the start you should do a **GET** request to the server at adress: **http://localhost:3030/jsonstore/advanced/articles/list**  where the response will be an object with the titles of the articles.

By clicking the **[More] button** for the selected **article**, it should **reveal** the content of a **hidden** div and **changes** the text of the button to **[Less]**. Obtain the content by making a **GET** request to the server at adress: **http://localhost:3030/jsonstore/advanced/articles/details/:id**  where the response will be an object with property **id**, **title**, **content.** When the same button is clicked **again** (now reading **Less**), **hide** the div and **change** the text of the button to **More**. Link action should be **toggleable** (you should be able to click the button infinite amount of times). 

**Example** ![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.020.png)

![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.021.png)

Every item should have the **following structure**:

![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.022.png "Screenshot 2021-02-26 120508")

You are allowed to add new attributes, but do not change the existing ones.
1. ## **Blog**
Write a program for reading blog content. It needs to make **requests** to the **server** and display **all blog posts** and their **comments**.
Request URLТs:

Posts - **http://localhost:3030/jsonstore/blog/posts**

Comments - **http://localhost:3030/jsonstore/blog/comments**

The button with ID "**btnLoadPosts**" should make a **GET** request to "**/posts**". The **response** from the **server** will be an **Object of objects.
![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.023.png)**

Each object will be in the following format:

**{**

`  `**body: {postBody},**

`  `**id: {postId},**

`  `**title: {postTitle}** 

**}**

Create an **<option>** for each post using its **object key** as value and **current object title property** as text inside the node with ID "**posts**".

![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.024.png)

![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.025.png)

When the button with ID "**btnViewPost**" is clicked, a **GET** request should be made to:

- **"/posts"** to retrieve all available posts and find the selected post from the dropdown menu. This request returns an object where each key represents a post ID, and each value contains post details (title and body).
- **"/comments"** to retrieve all comments. This request returns an **object** of **objects**, where each comment includes a postId field. The response is then filtered to include only comments that **match** the selected post's ID.

![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.026.png)

Each object will be in the following format: 

**{** 

`  `**id: {commentId},**

`  `**postId: {postId},**

`  `**text: {commentText}**

**}**

You have to find this comments that are for the current post (check the postId property)

Display the post title inside **h1** with ID "**post-title**" and the post content inside **p** with ID "**post-body**". Display **each comment** as a **<li>** inside **ul** with ID "**post-comments**". Do not forget to clear its content beforehand.

![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.027.png)

![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.028.png)
### **Submitting Your Solution**
Place in a **ZIP** file the content of the given resources including your solution. Exclude the **node\_modules** folder if there is one. Upload the archive to Judge.

![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.029.png)

![ артина, ко€то съдържа текст

ќписанието е генерирано автоматично](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.030.png)

![ артина, ко€то съдържа текст

ќписанието е генерирано автоматично](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.031.png)






![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.034.png)![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.035.png)![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.036.png)![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.037.png)![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.038.png)![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.039.png)![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.040.png)![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.041.png)![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.042.png)


![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.032.png)![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.033.png)![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.043.png)![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.044.png)![](Aspose.Words.f31da821-c582-4799-a193-9eec87c2a936.045.png)

