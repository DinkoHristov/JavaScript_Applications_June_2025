
# **Lab: Remote Databases**
Problems for in-class lab for the "[JavaScript Applications" course @ SoftUni](https://softuni.bg/courses/js-applications) 

**1. Firebase: All Books**

Firebase is a **mobile** and **web application** development **platform**. 

Create a "**TestApp**" and then create the **following** structure:

![firebase-books](Aspose.Words.7ba82365-5e88-4e79-9da4-fa28cfaa84da.001.png)

First task is to "**GET**" all books. To consume the request with **POSTMAN** your **url** should be the **following**: t https://testapp-13aec-default-rtdb.firebaseio.com/.json .

**DatabaseId** is unique for every application. You can **find** yours from here:

![](Aspose.Words.7ba82365-5e88-4e79-9da4-fa28cfaa84da.002.png)

We **should** also do one more configuration. Go to Database/Rules and set **.read** & **.write** actions to "**true**". This will allow us to **send** request with **POSTMAN**. Beware that now everyone can **manipulate** our database and even **delete** it. (this is for **testing** purposes only).

![](Aspose.Words.7ba82365-5e88-4e79-9da4-fa28cfaa84da.003.png)

**2. Firebase: Get Book** 

"**GET**" the Book with **id**: 1. Don’t forget the **.json** extension at the end (otherwise you will receive the whole **html**).

**3. Firebase: Create Book**

To **create** a book, we will have to send a "**POST**" request and the JSON body should be in the **following** format: 

![](Aspose.Words.7ba82365-5e88-4e79-9da4-fa28cfaa84da.004.png)

**4. Firebase: Patch Book** 

The HTTP command "**PATCH**" **modifies** an existing HTTP **resource** (it can also create the resource if it does **not** exist). The JSON body should be in the **following** format:

![](Aspose.Words.7ba82365-5e88-4e79-9da4-fa28cfaa84da.005.png)

**5. Firebase: Change Book Author**

The next task is to execute a "**PUT**" command (the difference is that with "**PUT"** we can update a resource **partially**). In our case we have to **change** the author’s name to "**New author was assigned**".

**REQUEST**: https://testapp-13aec-default-rtdb.firebaseio.com/Books/{bookID} /author/.json

The JSON body should be in the **following** format:

"**New author was assigned**".







![](Aspose.Words.7ba82365-5e88-4e79-9da4-fa28cfaa84da.008.png)![](Aspose.Words.7ba82365-5e88-4e79-9da4-fa28cfaa84da.009.png)![](Aspose.Words.7ba82365-5e88-4e79-9da4-fa28cfaa84da.010.png)![](Aspose.Words.7ba82365-5e88-4e79-9da4-fa28cfaa84da.011.png)![](Aspose.Words.7ba82365-5e88-4e79-9da4-fa28cfaa84da.012.png)![](Aspose.Words.7ba82365-5e88-4e79-9da4-fa28cfaa84da.013.png)![](Aspose.Words.7ba82365-5e88-4e79-9da4-fa28cfaa84da.014.png)![](Aspose.Words.7ba82365-5e88-4e79-9da4-fa28cfaa84da.015.png)![](Aspose.Words.7ba82365-5e88-4e79-9da4-fa28cfaa84da.016.png)


![](Aspose.Words.7ba82365-5e88-4e79-9da4-fa28cfaa84da.006.png)![](Aspose.Words.7ba82365-5e88-4e79-9da4-fa28cfaa84da.007.png)![](Aspose.Words.7ba82365-5e88-4e79-9da4-fa28cfaa84da.017.png)![](Aspose.Words.7ba82365-5e88-4e79-9da4-fa28cfaa84da.018.png)![](Aspose.Words.7ba82365-5e88-4e79-9da4-fa28cfaa84da.019.png)

