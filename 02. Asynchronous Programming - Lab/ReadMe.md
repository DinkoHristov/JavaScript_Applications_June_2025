
# **Lab: Asynchronous Programming**
Problems for exercises and homework for the ["JavaScript Apps" course @ SoftUni.](https://softuni.bg/courses/js-applications)
The following tasks do not have tests in the Judge system. They are for practice.
1. ## **Github Commits**
Write a JS program that loads all commit messages and their authors from a github repository using a given HTML. 

Skeleton will be provided in the **Resources** **folder**.

The **loadCommits()** function should get the **username** and **repository** from the HTML textboxes with IDs **"username"** and **"repo"** and make a **GET** request to the **Github API**:
**https://api.github.com/repos/<username>/<repository>/commits**

Swap **<username>** and **<repository>** with the ones from the HTML:

- In case of **success**, for **each** entry add a **list item** (<**li>**) in the **unordered list** (<**ul>**) with **id "commits"** with text in the following format:

  **"<commit.author.name>: <commit.message>"** 

- In case of an **error**, add a single **list item** (<**li>**) with text in the following format:
  **"Error: <error.status> (<error.statusText>)"**
### **Screenshots:**
![](Aspose.Words.e81b064e-d404-4a27-af1c-7346a003ce9e.001.png)

![](Aspose.Words.e81b064e-d404-4a27-af1c-7346a003ce9e.002.png)
1. ## **Blog**
Write a program for reading blog content. It needs to make **requests** to the **server** and display **all blog posts** and their **comments**.
Firebase URL - [https://blog-apps-c12bf.firebaseio.com/](https://blog-apps-c12bf.firebaseio.com/$%7bendPoint%7d.json)

Skeleton will be provided in the **Resources** **folder**.

The button with ID "**btnLoadPosts**" should make a **GET** request to "**/posts**". The **response** from the **server** will be an **Object of objects.
![](Aspose.Words.e81b064e-d404-4a27-af1c-7346a003ce9e.003.png)**

Each object will be in the following format:

**{**

`  `**body: {postBody},**

`  `**id: {postId},**

`  `**title: {postTitle}** 

**}**


Create an **<option>** for each post using its **object key** as value and **current object title property** as text inside the node with ID "**posts**".

![](Aspose.Words.e81b064e-d404-4a27-af1c-7346a003ce9e.004.png)![](Aspose.Words.e81b064e-d404-4a27-af1c-7346a003ce9e.005.png)

When the button with ID "**btnViewPost**" is clicked, a **GET** request should be made to:

- "**/posts/{postId}**" to obtain the selected post (from the dropdown menu with ID "**posts**") - The following **request** will return **a single object** as described above.
- "**/comments -** to obtain all comments. The request will **return** a **Object** of **objects**.
  ![](Aspose.Words.e81b064e-d404-4a27-af1c-7346a003ce9e.006.png)

Each object will be in the following format: 

**{** 

`  	`**id: {commentId},**

`  	`**postId: {postId},**

`  	`**text: {commentText}**

**}**
You have to find this comments that are for the current post (check the **postId** **property**)

Display the post title inside **h1** with ID "**post-title**" and the post content inside **ul** with ID "**post-body**". Display **each comment** as a **<li>** inside **ul** with ID "**post-comments**". Do not forget to clear its content beforehand.

![](Aspose.Words.e81b064e-d404-4a27-af1c-7346a003ce9e.007.png)

![](Aspose.Words.e81b064e-d404-4a27-af1c-7346a003ce9e.008.png)







![](Aspose.Words.e81b064e-d404-4a27-af1c-7346a003ce9e.011.png)![](Aspose.Words.e81b064e-d404-4a27-af1c-7346a003ce9e.012.png)![](Aspose.Words.e81b064e-d404-4a27-af1c-7346a003ce9e.013.png)![](Aspose.Words.e81b064e-d404-4a27-af1c-7346a003ce9e.014.png)![](Aspose.Words.e81b064e-d404-4a27-af1c-7346a003ce9e.015.png)![](Aspose.Words.e81b064e-d404-4a27-af1c-7346a003ce9e.016.png)![](Aspose.Words.e81b064e-d404-4a27-af1c-7346a003ce9e.017.png)![](Aspose.Words.e81b064e-d404-4a27-af1c-7346a003ce9e.018.png)![](Aspose.Words.e81b064e-d404-4a27-af1c-7346a003ce9e.019.png)


![](Aspose.Words.e81b064e-d404-4a27-af1c-7346a003ce9e.009.png)![](Aspose.Words.e81b064e-d404-4a27-af1c-7346a003ce9e.010.png)![](Aspose.Words.e81b064e-d404-4a27-af1c-7346a003ce9e.020.png)![](Aspose.Words.e81b064e-d404-4a27-af1c-7346a003ce9e.021.png)![](Aspose.Words.e81b064e-d404-4a27-af1c-7346a003ce9e.022.png)

