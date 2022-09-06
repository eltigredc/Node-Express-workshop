# Node Express introduction 

## introduction

During this workshop we will code together a fully working Node based social media app. Our goal is to create an instagram app clone. The workshop will be split in two parts, a first part where you will follow along as I code and talk in front of you, and a second part, where you will be able to test it by yourself and try to create something. 

## Features 

- A user user can login or sign up to the app (Authentication).
- A user can either check his own user page or the general landing page.
- On his own user page, the user can see all his previous posts as well as adding a new one.
- On the landing page, the user can see all the posts from all the users of the page.
- The user can search for other users and access their user pages, where they'll see all the posts from theirs.

## Technologies

- Node (js)
- HTML/CSS

- bcrypt
- cloudinary
- connect-flash
- ejs
- express
- express-ejs-layouts
- express-fileupload
- express-session
- mongoose
- multer
- multer-storage-cloudinary
- passport
- passport-local

## requirements

Node, npm


## 01 - Setup, Part One, node first steps.

Okay, we will be using node, and talking about it as we go, lets start by simply creating a new folder where will add all of out work. In your terminal simply type :

```bash
mkdir node-express-app
```

Navigate into said folder and create our first needed file, we will call it "app".

```bash
touch app.js
```

This is actually all you need to get started with node.

inside __app.js__ just write 

```js
console.log('Hello from Node')
```

then type in your terminal:

```bash
node app.js
```

if you see this :

![terminal-01](/images/01.png)

Then everything is good and you're good to go, if not, check the requirements again to be sure everything is properly installed.

allright, so you might have understood that by writing __node__ in front of a file name in your terminal, it allows you to run your javascript code from there. 

Normally, you are used to play around with javascript in the browser, as a frontend tech, but if you are here today, it is because you would like to play around with javascript backend. And that is what node is : 

*an open-source, cross-platform, back-end JavaScript runtime environment that runs on a JavaScript Engine and executes JavaScript code outside a web browser.*

Don't believe me? Lets try to write a line of javascript that would usually only be considered as frontend. 
Let's try :

```js 
document.querySelector('body');
```

as you can see, it does not work...

![terminal-02](/images/02.png)
We are in a backend environement now.


## 02 - Setup, Part two, Node package manager.

Time to install our framework of choice, __EXPRESS__. express will be our best friend in the future to be able to code our application.

To be able to install __EXPRESS__ we will need to use __NPM__ or, "node package manager". __NPM__ is a tool that allow us to get code from other places and install and use it in our app.

To get started in npm, be sure you have downloaded it, go into the root of your app folder and type: 

```bash
npm init
```

This Should run a generator that will go through the creation of a __JSON__ file for you, you can keep all the default params, by simply pressing the __ENTER__ key when prompted to.

![terminal-03](/images/03.png)

After the generation your folder tree should look like this :

![Folder-Tree-01](/images/04.png)

and your __package.json__ file should contain: 

```json
{
  "name": "express-app",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

it of course could be a bit diferent if you typed some other informations during the generation of the file.

Now that we have __NPM__ setted up, it is time to install our framework. For that, go back into the terminal and type:

```bash
npm install express --save
```

If the installation is successful, you should find in your terminal something looking like this:

![image](/images/05.png)

You will also see that a new file and a new folder have been generated and are now part of our folder tree : 

![image](/images/06.png)

*The ___package-lock.json___ file, as well as the ___node_modules___ folder should never be modified by your hands, they will change, and generate changes without EVER the need of you to mingle inside of them.*

### What is the purpose of node_modules folder?

*You can think of the node_modules folder like a cache for the external modules that your project depends upon. When you npm install them, they are downloaded from the web and copied into the node_modules folder and Node.js is trained to look for them there when you import them (without a specific path). I refer to it as a cache because the node_modules folder can be entirely recreated from scratch at any time by just reinstalling all the dependent modules (that should be listed in your project folders).*

### What is the package-lock.json file?

*Description. package-lock. json is automatically generated for any operations where npm modifies either the node_modules tree, or package. json . It describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates.*


Super, we have our first package installed, and we understood how to install packages, let's go ahead and use express to create a little local server for our app.

## 03 - Express server

To setup your server, go back into your __app.js__ file, if there is leftover code writen there, you can delete everything, and replace it with this code

```js
// DEPENDENCIES
const express = require('express');

// VARIABLES
const app = express();
const port = 3000

// SERVER
app.listen(port, () => {
  console.log(`congratulations your app is listening on port ${port}`)
})
```

- Everything under the dependencies comment will link serves the purpose, of calling a package that has been installed previously, in this case, we call the __EXPRESS__ library to be able to use it in our file.

- Everything under the Variables comment, will serve the purpose of defining variables that we will use use int this file. In this case, we define the const *app* using the express package, as well as the const *port* that will allow us to quickly change the port where the app runs if we need it.

- the *app* Variable is a very important one, you need to think of it as the keyword representing your all project, your all app. 

- In this case, we are already using the *app* variable to call the *listen* function on top of it. what will *listen* do? it will start a server and listen on port 3000 for connections.

Let's try it out! Go back into your terminal and run :

```bash
node app.js
```
If everything went well, your terminal should show you something like this :

![image](/images/07.png)

You now have a local server running, leave it running and open any web browser of your choice. And try to connect to __localhost:3000__

this is what you should see :

![image](/images/08.png)

If that is the case, you are all setup for this part, and ready to switch to creating your first page.

## 04 - First Page and Root Path

For the moment, we created our server, and manage to check it out on our web browser. Sadly, it seems like theres an error of some kind as the web page displays a message showcasing :

__Cannot GET /__

What does it mean? It means that for the moment, yes, we have a server, but it is not doing anything not rendering anything, not sending any data, it is just running. 

Let's imagine that our app is now finished, it has a big big big number of features everywhere. How do we know where to find these features and how do we launch these features? Well We give them a __ROUTE__ to follow.

Let's imagine that our app is a building, a very big building, each appartment is a feature, and each appartment number is its __ROUTE__ By  having numbers linked to each appartment I can Access the appartment of my choice.

Let's create our first __ROUTE__ and this one  is a special one, it has a special name, we are going to call it the __ROOT__ __ROUTE__.

Why the __ROOT__ because its where our application starts, and is at the basis of everything else. To define it, we are not going to give it an appartment number, but a PATH, and in this case a very unique one:

the root url : __(/)__

to do that we are going to go back into our __app.js__ file and add :

```js
(...)
const port = 3000

// ROUTES
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// SERVER
(...)
```

what do these lines do? We create a __GET__ request on the __ROOT__ path, or (/). this request, contains a callback function, that has two params : 

- req (request)
- res (response)

this callback function has one purpose for now, use its response to send back to the user, the string ("Hello World").

Go back to your web Browser on localhost:3000 and refresh the page. You  don't see any changes? Thats expected, go forward to discover why.

## 05 - Nodemon and Dev packages

If you wonder, why you can't see any updates in your web browser, that is because your node server did not see the modification you did to your file, if you want to see it you'll have to kill your server by pressing:
 __CTRL + C__ in your terminal, and launching again:

```bash
node app.js
```
in your terminal.

By doing so, and going back to your web browser, you should be able to see that the ROOT PATH actually now displays your "Hello World" string.

![image](/images/09.png)

Nice, it works, but it is a bit of a hastle to have to kill and restart our server every time we make a change in our code.

There is a solution for that, and like a in a lot of situations this solution comes in the form of a package. A package called __NODEMON__

Nodemon is a utility depended on about 3 million projects, that will monitor for any changes in your source and automatically restart your server. Perfect for development.

Swap nodemon instead of node to run your code, and now your process will automatically restart when your code changes. To install, get Node.js, then from your terminal run:

```bash
npm install -g nodemon
```

And then, instead of running

```bash
node app.js
```

you will now run

```bash
nodemon app.js
```

You now have a very nice dev server, that will reload when it sees changes! Congrats! 


## 06 - My first View

It is very nice, we have a dev server, we can make a request to our __ROOT PATH__ by refreshing our localhost:3000, this request gives us back a string. 

BUT, what we want is to actually be able to display some HTML and CSS right? because a simple string does not help us that much. 

We are going to start by being able to render our landing page, our first view.

For that let's create a new folder called __views__ at the root of our folder tree. and inside this folder, let's create a file called __home.ejs__

Your folder tree should look like this :  

![image](/images/10.png)

You might currently be asking yourself, What the hell is __.ejs__ Well, its short for __"Embeded javascript"__ and for now let's simply say that it is a more powerful version of HTML, a version that allows us to embed javascript inside our HTML.

*EJS simply stands for Embedded Javascript. It is a simple templating language/engine that lets its user generate HTML with plain javascript. EJS is mostly useful whenever you have to output HTML with a lot of javascript.*


Before continuing, I will be adding a new folder called __public__ in which will add a folder called __images__ containing all the starter images that we will use, you'll find said folder in the assets folder of this repo.

As we are in the  creation of folders, I'll already create a __stylesheets__ folder there, as well as a __home.css__ file inside of it.

Our folder tree now looks like this : 

![image](/images/11.png)

Okay, time to add some HTML code in our EJS file __home.ejs__

```html
<nav class="navbar">
    <div class="nav-wrapper">
        <img src="img/logo.PNG" class="brand-img" alt="">
        <input type="text" class="search-box" placeholder="search">
        <div class="nav-items">
            <img src="img/home.PNG" class="icon" alt="">
            <img src="img/messenger.PNG" class="icon" alt="">
            <img src="img/add.PNG" class="icon" alt="">
            <img src="img/explore.PNG" class="icon" alt="">
            <img src="img/like.PNG" class="icon" alt="">
            <div class="icon user-profile"></div>
        </div>
    </div>
</nav>

<section class="main">
    <div class="wrapper">
        <div class="left-col">
            <!-- STATUS WRAPPER -->
            <div class="status-wrapper">
                <div class="status-card">
                    <div class="profile-pic"><img src="img/cover 1.png" alt=""></div>
                    <p class="username">user_name_1</p>
                </div>
                <div class="status-card">
                    <div class="profile-pic"><img src="img/cover 2.png" alt=""></div>
                    <p class="username">user_name_2</p>
                </div>
                <div class="status-card">
                    <div class="profile-pic"><img src="img/cover 3.png" alt=""></div>
                    <p class="username">user_name_3</p>
                </div>
                // +5 more status card elements.

            </div>
            <!-- END OF STATUS WRAPPER -->
            <!-- POSTS -->
            <div class="post">
                <div class="info">
                    <div class="user">
                        <div class="profile-pic"><img src="img/cover 1.png" alt=""></div>
                        <p class="username">modern_web_channel</p>
                    </div>
                    <img src="img/option.PNG" class="options" alt="">
                </div>
                <img src="img/cover 1.png" class="post-image" alt="">
                <div class="post-content">
                    <div class="reaction-wrapper">
                        <img src="img/like.PNG" class="icon" alt="">
                        <img src="img/comment.PNG" class="icon" alt="">
                        <img src="img/send.PNG" class="icon" alt="">
                        <img src="img/save.PNG" class="save icon" alt="">
                    </div>
                    <p class="likes">1,012 likes</p>
                    <p class="description"><span>username </span> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur tenetur veritatis placeat, molestiae impedit aut provident eum quo natus molestias?</p>
                    <p class="post-time">2 minutes ago</p>
                </div>
                <div class="comment-wrapper">
                    <img src="img/smile.PNG" class="icon" alt="">
                    <input type="text" class="comment-box" placeholder="Add a comment">
                    <button class="comment-btn">post</button>
                </div>
            </div>
            <div class="post">
                <div class="info">
                    <div class="user">
                        <div class="profile-pic"><img src="img/cover 2.png" alt=""></div>
                        <p class="username">modern_web_channel</p>
                    </div>
                    <img src="img/option.PNG" class="options" alt="">
                </div>
                <img src="img/cover 2.png" class="post-image" alt="">
                <div class="post-content">
                    <div class="reaction-wrapper">
                        <img src="img/like.PNG" class="icon" alt="">
                        <img src="img/comment.PNG" class="icon" alt="">
                        <img src="img/send.PNG" class="icon" alt="">
                        <img src="img/save.PNG" class="save icon" alt="">
                    </div>
                    <p class="likes">1,012 likes</p>
                    <p class="description"><span>username </span> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur tenetur veritatis placeat, molestiae impedit aut provident eum quo natus molestias?</p>
                    <p class="post-time">2 minutes ago</p>
                </div>
                <div class="comment-wrapper">
                    <img src="img/smile.PNG" class="icon" alt="">
                    <input type="text" class="comment-box" placeholder="Add a comment">
                    <button class="comment-btn">post</button>
                </div>
            </div>
            <!-- END OF POSTS -->
        </div>
    </div>
</section>
```

Super, let's refresh our __localhost:3000__ to see our beautiful html in action! Nothing happened? Normal, there is still some setup that we need to do in order to be able to see it.

1. install these new dependencies:

```bash
npm install ejs express-ejs-layouts --save
```

2. Setup the __ejs__ view engine in the __app.js__ file.

For that, open your __app.js__ and add these line :

- the new dependencies  :  

```js
// DEPENDENCIES
const express = require('express');
const expressEjsLayout = require('express-ejs-layouts')
```

- A new __SETUP__ comment  with these lines of code :

```js
(...)
const port = 3000

//SETUP
app.set('view engine','ejs');
app.use(expressEjsLayout);

// ROUTES
(...)
```
These two lines code allow us to set EJS as our view engine of choice. 

let us now actually link our ejs file with our '/' ROOT path.
for that, will modify the route defined earlier with this new one :

```js
app.get('/', (req, res) => {
  res.render('home');
})
```

and refresh our __localhost:3000__ we should now be able to see this error : 

![image](/images/12.png)

this comes from the __expressEjsLayout__ dependency we just installed, it asks for another setup file called __layout.ejs__ that will allow us to already install some templating in our app.

In our __views__ we will add another file called __layout.ejs__

![image](/images/13.png)

and in this file, we'll  be able to add this following HTML code:

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>
<body>
	<%- body %>
</body>
</html>
```

As you can see, we have here some basic HTML setup code, the only  weird thing that  we do know yet is this 

```ejs
<%- body %>
```

this is a perfect way for you to be introduced into your first embeded javascript exemple.

it means that every ejs file that we render in the future will contain said layout.

Lets refresh our __localhost:3000__ and see that our root path now renders HTML.

![image](/images/14.png)

Congratulations, we now have our first HTML page It is a great achievment! But let's not stop here, our next step will be to add some style and images to it.

## 07 - Style it up!

Time to style it up, in our already created __public/stylesheets/home.css__ let's  add the following code :

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

*:focus{
    outline: none;
}

body{
    width: 100%;
    background: #fafafa;
    position: relative;
    font-family: 'roboto', sans-serif;
}

.navbar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: #fff;
    border-bottom: 1px solid #dfdfdf;
    display: flex;
    justify-content: center;
    padding: 5px 0;
}

.nav-wrapper{
    width: 70%;
    max-width: 1000px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.brand-img{
    height: 100%;
    margin-top: 5px;
}

.search-box{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 25px;
    background: #fafafa;
    border: 1px solid #dfdfdf;
    border-radius: 2px;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    text-transform: capitalize;
}

.search-box::placeholder{
    color: rgba(0, 0, 0, 0.5);
}

.nav-items{
    height: 22px;
    position: relative;
}

.icon{
    height: 100%;
    cursor: pointer;
    margin: 0 10px;
    display: inline-block;
}

.user-profile{
    width: 22px;
    border-radius: 50%;
    background-image: url(img/profile-pic.png);
    background-size: cover;
}

.main{
    width: 100%;
    padding: 40px 0;
    display: flex;
    justify-content: center;
    margin-top: 50px;
}

.wrapper{
    width: 70%;
    max-width: 1000px;
    display: grid;
    grid-template-columns: 60% 40%;
    grid-gap: 30px;
}

.left-col{
    display: flex;
    flex-direction: column;
}

.status-wrapper{
    width: 100%;
    height: 120px;
    background: #fff;
    border: 1px solid #dfdfdf;
    border-radius: 2px;
    padding: 10px;
    padding-right: 0;
    display: flex;
    align-items: center;
    overflow: hidden;
    overflow-x: auto;
}

.status-wrapper::-webkit-scrollbar{
    display: none;
}

.status-card{
    flex: 0 0 auto;
    width: 80px;
    max-width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 15px;
}

.profile-pic{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
    padding: 3px;
    background: linear-gradient(45deg, rgb(255, 230, 0), rgb(255, 0, 128) 80%);
}

.profile-pic img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid #fff;
}

.username{
    width: 100%;
    overflow: hidden;
    text-align: center;
    font-size: 12px;
    margin-top:5px;
    color: rgba(0, 0, 0, 0.5)
}
.post{
    width: 100%;
    height: auto;
    background: #fff;
    border: 1px solid #dfdfdf;
    margin-top: 40px;
}

.info{
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}

.info .username{
    width: auto;
    font-weight: bold;
    color: #000;
    font-size: 14px;
    margin-left: 10px;
}

.info .options{
    height: 10px;
    cursor: pointer;
}

.info .user{
    display: flex;
    align-items: center;
}

.info .profile-pic{
    height: 40px;
    width: 40px;
    padding: 0;
    background: none;
}

.info .profile-pic img{
    border: none;
}

.post-image{
    width: 100%;
    height: 500px;
    object-fit: cover;
}

.post-content{
    width: 100%;
    padding: 20px;
}

.likes{
    font-weight: bold;
}

.description{
    margin: 10px 0;
    font-size: 14px;
    line-height: 20px;
}

.description span{
    font-weight: bold;
    margin-right: 10px;
}

.post-time{
    color: rgba(0, 0, 0, 0.5);
    font-size: 12px;
}

.comment-wrapper{
    width: 100%;
    height: 50px;
    border-radius: 1px solid #dfdfdf;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.comment-wrapper .icon{
    height: 30px;
}

.comment-box{
    width: 80%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 14px;
}

.comment-btn,
.action-btn{
    width: 70px;
    height: 100%;
    background: none;
    border: none;
    outline: none;
    text-transform: capitalize;
    font-size: 16px;
    color: rgb(0, 162, 255);
    opacity: 0.5;
}

.reaction-wrapper{
    width: 100%;
    height: 50px;
    display: flex;
    margin-top: -20px;
    align-items: center;
}

.reaction-wrapper .icon{
    height: 25px;
    margin: 0;
    margin-right: 20px;
}

.reaction-wrapper .icon.save{
    margin-left: auto;
}
```

If we reload our web broweser, we will see that nothing happens, nothing changes, that is because we have not linked our stylesheet with our ejs file, as well as told __EXPRESS__ where to find our stylesheets. Let's do just that!

In our __app.js__ file we will add another setup line of code in the form of : 

```js
app.use("/static", express.static("public"));
```

This will tell Express that we will access all of our static assets inside the public folder.
In our __views/layout.ejs__ file, we will add the line

```html
<link rel="stylesheet" href="/static/stylesheets/home.css">
```
By reloading our web browser, we will now be able to see the makings of our beautiful app.

![image](/images/15.png)

it is starting to look good, but as i'm sure you'll be able to see, we are missing all of our images, let's fix that by tweaking our HTML, everywhere that we will find

```html
src="img/..."
```

as the image source of an image element, we'll have to replace it with 


```html
src="/static/images/..."
```

By doing so and refreshing the web browser, we are now able to see our fully styled home page

![image](/images/16.png)

What a stunner! 

Let's add our profile page next and last, before tackling our first backend features.


## 08 - Profile page

First of all, we are going to create 2 new files.

1. __views/profile.ejs__
2. __public/stylesheets/profile.css__

In the first one, we will add the following HTML code

```html
<link rel="stylesheet" href="/static/stylesheets/profile.css">
<header>

	<div class="container">

		<div class="profile">

			<div class="profile-image">

				<img src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces" alt="">

			</div>

			<div class="profile-user-settings">

				<h1 class="profile-user-name">janedoe_</h1>

				<button class="btn profile-edit-btn">Edit Profile</button>

				<button class="btn profile-settings-btn" aria-label="profile settings"><i class="fas fa-cog" aria-hidden="true"></i></button>

			</div>

			<div class="profile-stats">

				<ul>
					<li><span class="profile-stat-count">164</span> posts</li>
					<li><span class="profile-stat-count">188</span> followers</li>
					<li><span class="profile-stat-count">206</span> following</li>
				</ul>

			</div>

			<div class="profile-bio">

				<p><span class="profile-real-name">Jane Doe</span> Lorem ipsum dolor sit, amet consectetur adipisicing elit 📷✈️🏕️</p>

			</div>

		</div>
		<!-- End of profile section -->

	</div>
	<!-- End of container -->

</header>

<main>

	<div class="container">

		<div class="gallery">

			<div class="gallery-item" tabindex="0">

				<img src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop" class="gallery-image" alt="">

				<div class="gallery-item-info">

					<ul>
						<li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 56</li>
						<li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 2</li>
					</ul>

				</div>

			</div>

			<div class="gallery-item" tabindex="0">

				<img src="https://images.unsplash.com/photo-1497445462247-4330a224fdb1?w=500&h=500&fit=crop" class="gallery-image" alt="">

				<div class="gallery-item-info">

					<ul>
						<li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 89</li>
						<li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 5</li>
					</ul>

				</div>

			</div>

			<div class="gallery-item" tabindex="0">

				<img src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&h=500&fit=crop" class="gallery-image" alt="">

				<div class="gallery-item-type">

					<span class="visually-hidden">Gallery</span><i class="fas fa-clone" aria-hidden="true"></i>

				</div>

				<div class="gallery-item-info">

					<ul>
						<li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 42</li>
						<li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 1</li>
					</ul>

				</div>

			</div>

			<div class="gallery-item" tabindex="0">

				<img src="https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop" class="gallery-image" alt="">

				<div class="gallery-item-type">

					<span class="visually-hidden">Video</span><i class="fas fa-video" aria-hidden="true"></i>

				</div>

				<div class="gallery-item-info">

					<ul>
						<li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 38</li>
						<li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 0</li>
					</ul>

				</div>

			</div>

			<div class="gallery-item" tabindex="0">

				<img src="https://images.unsplash.com/photo-1498471731312-b6d2b8280c61?w=500&h=500&fit=crop" class="gallery-image" alt="">

				<div class="gallery-item-type">

					<span class="visually-hidden">Gallery</span><i class="fas fa-clone" aria-hidden="true"></i>

				</div>

				<div class="gallery-item-info">

					<ul>
						<li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 47</li>
						<li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 1</li>
					</ul>

				</div>

			</div>

			<div class="gallery-item" tabindex="0">

				<img src="https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=500&h=500&fit=crop" class="gallery-image" alt="">

				<div class="gallery-item-info">

					<ul>
						<li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 94</li>
						<li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 3</li>
					</ul>

				</div>

			</div>

			<div class="gallery-item" tabindex="0">

				<img src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=500&h=500&fit=crop" class="gallery-image" alt="">

				<div class="gallery-item-type">

					<span class="visually-hidden">Gallery</span><i class="fas fa-clone" aria-hidden="true"></i>

				</div>

				<div class="gallery-item-info">

					<ul>
						<li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 52</li>
						<li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 4</li>
					</ul>

				</div>

			</div>

			<div class="gallery-item" tabindex="0">

				<img src="https://images.unsplash.com/photo-1515814472071-4d632dbc5d4a?w=500&h=500&fit=crop" class="gallery-image" alt="">

				<div class="gallery-item-info">

					<ul>
						<li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 66</li>
						<li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 2</li>
					</ul>

				</div>

			</div>

			<div class="gallery-item" tabindex="0">

				<img src="https://images.unsplash.com/photo-1511407397940-d57f68e81203?w=500&h=500&fit=crop" class="gallery-image" alt="">

				<div class="gallery-item-type">

					<span class="visually-hidden">Gallery</span><i class="fas fa-clone" aria-hidden="true"></i>

				</div>

				<div class="gallery-item-info">

					<ul>
						<li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 45</li>
						<li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 0</li>
					</ul>

				</div>

			</div>

			<div class="gallery-item" tabindex="0">

				<img src="https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?w=500&h=500&fit=crop" class="gallery-image" alt="">

				<div class="gallery-item-info">

					<ul>
						<li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 34</li>
						<li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 1</li>
					</ul>

				</div>

			</div>

			<div class="gallery-item" tabindex="0">

				<img src="https://images.unsplash.com/photo-1505058707965-09a4469a87e4?w=500&h=500&fit=crop" class="gallery-image" alt="">

				<div class="gallery-item-info">

					<ul>
						<li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 41</li>
						<li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 0</li>
					</ul>

				</div>

			</div>

			<div class="gallery-item" tabindex="0">

				<img src="https://images.unsplash.com/photo-1423012373122-fff0a5d28cc9?w=500&h=500&fit=crop" class="gallery-image" alt="">

				<div class="gallery-item-type">

					<span class="visually-hidden">Video</span><i class="fas fa-video" aria-hidden="true"></i>

				</div>

				<div class="gallery-item-info">

					<ul>
						<li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 30</li>
						<li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 2</li>
					</ul>

				</div>

			</div>

		</div>
		<!-- End of gallery -->

		<div class="loader"></div>

	</div>
	<!-- End of container -->

</main>
```

and in the latter

```css
:root {
    font-size: 10px;
}

*,
*::before,
*::after {
    box-sizing: border-box;
}

body {
    font-family: "Open Sans", Arial, sans-serif;
    min-height: 100vh;
    background-color: #fafafa;
    color: #262626;
    padding-bottom: 3rem;
}

img {
    display: block;
}

.container {
    max-width: 93.5rem;
    margin: 0 auto;
    padding: 0 2rem;
}

.btn {
    display: inline-block;
    font: inherit;
    background: none;
    border: none;
    color: inherit;
    padding: 0;
    cursor: pointer;
}

.btn:focus {
    outline: 0.5rem auto #4d90fe;
}

.visually-hidden {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
}

/* Profile Section */

.profile {
    padding: 5rem 0;
}

.profile::after {
    content: "";
    display: block;
    clear: both;
}

.profile-image {
    float: left;
    width: calc(33.333% - 1rem);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 3rem;
}

.profile-image img {
    border-radius: 50%;
}

.profile-user-settings,
.profile-stats,
.profile-bio {
    float: left;
    width: calc(66.666% - 2rem);
}

.profile-user-settings {
    margin-top: 1.1rem;
}

.profile-user-name {
    display: inline-block;
    font-size: 3.2rem;
    font-weight: 300;
}

.profile-edit-btn {
    font-size: 1.4rem;
    line-height: 1.8;
    border: 0.1rem solid #dbdbdb;
    border-radius: 0.3rem;
    padding: 0 2.4rem;
    margin-left: 2rem;
}

.profile-settings-btn {
    font-size: 2rem;
    margin-left: 1rem;
}

.profile-stats {
    margin-top: 2.3rem;
}

.profile-stats li {
    display: inline-block;
    font-size: 1.6rem;
    line-height: 1.5;
    margin-right: 4rem;
    cursor: pointer;
}

.profile-stats li:last-of-type {
    margin-right: 0;
}

.profile-bio {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.5;
    margin-top: 2.3rem;
}

.profile-real-name,
.profile-stat-count,
.profile-edit-btn {
    font-weight: 600;
}

/* Gallery Section */

.gallery {
    display: flex;
    flex-wrap: wrap;
    margin: -1rem -1rem;
    padding-bottom: 3rem;
}

.gallery-item {
    position: relative;
    flex: 1 0 22rem;
    margin: 1rem;
    color: #fff;
    cursor: pointer;
}

.gallery-item:hover .gallery-item-info,
.gallery-item:focus .gallery-item-info {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
}

.gallery-item-info {
    display: none;
}

.gallery-item-info li {
    display: inline-block;
    font-size: 1.7rem;
    font-weight: 600;
}

.gallery-item-likes {
    margin-right: 2.2rem;
}

.gallery-item-type {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2.5rem;
    text-shadow: 0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 0.1);
}

.fa-clone,
.fa-comment {
    transform: rotateY(180deg);
}

.gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Loader */

.loader {
    width: 5rem;
    height: 5rem;
    border: 0.6rem solid #999;
    border-bottom-color: transparent;
    border-radius: 50%;
    margin: 0 auto;
    animation: loader 500ms linear infinite;
}

/* Media Query */

@media screen and (max-width: 40rem) {
    .profile {
        display: flex;
        flex-wrap: wrap;
        padding: 4rem 0;
    }

    .profile::after {
        display: none;
    }

    .profile-image,
    .profile-user-settings,
    .profile-bio,
    .profile-stats {
        float: none;
        width: auto;
    }

    .profile-image img {
        width: 7.7rem;
    }

    .profile-user-settings {
        flex-basis: calc(100% - 10.7rem);
        display: flex;
        flex-wrap: wrap;
        margin-top: 1rem;
    }

    .profile-user-name {
        font-size: 2.2rem;
    }

    .profile-edit-btn {
        order: 1;
        padding: 0;
        text-align: center;
        margin-top: 1rem;
    }

    .profile-edit-btn {
        margin-left: 0;
    }

    .profile-bio {
        font-size: 1.4rem;
        margin-top: 1.5rem;
    }

    .profile-edit-btn,
    .profile-bio,
    .profile-stats {
        flex-basis: 100%;
    }

    .profile-stats {
        order: 1;
        margin-top: 1.5rem;
    }

    .profile-stats ul {
        display: flex;
        text-align: center;
        padding: 1.2rem 0;
        border-top: 0.1rem solid #dadada;
        border-bottom: 0.1rem solid #dadada;
    }

    .profile-stats li {
        font-size: 1.4rem;
        flex: 1;
        margin: 0;
    }

    .profile-stat-count {
        display: block;
    }
}

/* Spinner Animation */

@keyframes loader {
    to {
        transform: rotate(360deg);
    }
}

/*

The following code will only run if your browser supports CSS grid.

Remove or comment-out the code block below to see how the browser will fall-back to flexbox & floated styling. 

*/

@supports (display: grid) {
    .profile {
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-template-rows: repeat(3, auto);
        grid-column-gap: 3rem;
        align-items: center;
    }

    .profile-image {
        grid-row: 1 / -1;
    }

    .gallery {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
        grid-gap: 2rem;
    }

    .profile-image,
    .profile-user-settings,
    .profile-stats,
    .profile-bio,
    .gallery-item,
    .gallery {
        width: auto;
        margin: 0;
    }

    @media (max-width: 40rem) {
        .profile {
            grid-template-columns: auto 1fr;
            grid-row-gap: 1.5rem;
        }

        .profile-image {
            grid-row: 1 / 2;
        }

        .profile-user-settings {
            display: grid;
            grid-template-columns: auto 1fr;
            grid-gap: 1rem;
        }

        .profile-edit-btn,
        .profile-stats,
        .profile-bio {
            grid-column: 1 / -1;
        }

        .profile-user-settings,
        .profile-edit-btn,
        .profile-settings-btn,
        .profile-bio,
        .profile-stats {
            margin: 0;
        }
    }
}
```

Superbe! We have our new page setted up, but we can't see it... New view, means new css, means new route.

in our __app.js__ let's add a new route in the form of the following lines of code

```js
(...)
// ROUTES
app.get('/', (req, res) => {
  res.render('home');
})

app.get('/profile', (req, res) => {
  res.render('profile');
})

// SERVER
(...)
```
and we can now try to connect to __localhost:3000/profile__

BEAUTIFUL! we now have routing! I hope you get how basic routing works now, its quite simple right?

As you can see by changing our __URL__(route/path) we can already access different pages.

![image](/images/17.png)


## 09 - Database connection

So, we tackled a nice frontend, but it is time to also tackle a nice backend. Play around with authentication, create posts and consult other users profiles.

To be able to do all that, we will need to code some nice features, but everything will start with a database, and a connection to it.

We will use [Mongo db Atlas](https://www.mongodb.com/), it is the online hosted version of MongoDb and allows us to set up and play with a database for free (at start).

Go ahead and start by creating an account.

Once your account created and youself connected, you should see a Dashboard that looks a something like this.

Go ahead and click on __"New Project"__

![image](/images/18.png)

Name your project

![image](/images/19.png)

Set yourself as the project owner, and add people to your project if you need to and then, create your project!

![image](/images/20.png)

Once created you should find yourself on this dashboard.

![image](/images/21.png)

Go ahead and click on __"Build a Database"__ and choose the free tier option

![image](/images/22.png)

Choose the cloud provider of your choice, and click on __"Create Cluster"__

Then, fill in your security info, Be careful to remember your username and password, as they will be very important for the next steps.

To finish the security mesures, add your IP adress to the list of authorized adresses or/and add the __0.0.0.0__ IP adress to authorize any IP to connect to the cluster.


All right, everything is set up, if you go back to the database tab, yoou should see your cluster, by default, it is called Cluster0.

Click on the __Connect__ button

![image](/images/23.png)

And then, choose __"Connect your application"__

![image](/images/24.png)

You should see a modal looking like this :

![image](/images/25.png)

Keep this modal open, but let's go back to our text editor and terminal, because we will have to write some code.

The first step for us is to connect our application to our database everytime we start it. For that you might have guessed it, but we will use yet another Library. We will use __mongoose__, Mongoose will help us for every database related features, it has a bunch of already made functions that will simplify our life.

so once again, open your terminal and run :

```bash
npm install mongoose --save
```

*What is Mongoose?
Mongoose is a Node.js-based Object Data Modeling (ODM) library for MongoDB. It is akin to an Object Relational Mapper (ORM) such as SQLAlchemy for traditional SQL databases. The problem that Mongoose aims to solve is allowing developers to enforce a specific schema at the application layer. In addition to enforcing a schema, Mongoose also offers a variety of hooks, model validation, and other features aimed at making it easier to work with MongoDB.*


Once mongoose has been installed we will have to fire the  connection at every app launch, that means, tha we will play around with our __app.js__ file once again.

First, let's add our newest dependency at the top level of the file.

```js
// DEPENDENCIES
const express = require('express');
const expressEjsLayout = require('express-ejs-layouts')
const mongoose = require('mongoose');
```

Then we will add a new Comment/chapter called "DATABASE SETUP" in which we will add our connection code

```js
//DATABASE SETUP
mongoose.connect('',{})
.then(() => )
.catch((err)=> );
```
the connect function takes two argument.

1. Open the modal that you should still have on the background because the first argument will be found there.

![image](/images/26.png)

Copy this line into the first string argument, and don't forget to replace the password you've setted up earlier. it should give you something like this.

```js
//DATABASE SETUP
mongoose.connect('mongodb+srv://snoopDiog:<password>@cluster0.pz7jo9z.mongodb.net/?retryWrites=true&w=majority',{})
.then(() => )
.catch((err)=> );
```

Nice!

2. The second argument, is an object, and it is actually params that you can pass to your database connection. in our case, we will pass two params : 
```js
//DATABASE SETUP
mongoose.connect('mongodb+srv://snoopDiog:<password>@cluster0.pz7jo9z.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => )
.catch((err)=> );
```
If you want to know why we add these options, I invite you to read more about it on [here](https://mongoosejs.com/docs/5.x/docs/deprecations.html).

Then it would be nice to have a little feedback on what's going on, so let's add a little console log when everything's fine as well a second one when there's an error

```js
mongoose.connect('mongodb+srv://snoopDiog:<password>@cluster0.pz7jo9z.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('I just connected to your DB, And ready to rumble'))
.catch((err)=> console.log(err));
```

If you did everything correctly, when you run 

```bash
nodemon app.js
```

you should see this on your terminal :

![image](/images/27.png)

If not, it usually means, that you messed up your password, don't worry though, you can go back to mongoDB and change it to something new :)


## 10 - Authentication : My first model

Time to talk authentication, we want our app to be secure, for users, to create account, and only be able to access data when they are logged in. 

We will for that need to have actual users in our database and for that  and for all of our backend management, we will use the MVC paradygm.

We already have the __views__ folder, but we are missing the __models__ as well as the __controllers__ folders. 

so let's create them and inside the __models__ folder, let's already create the __user.js__ file.

Our folder tree should look something like this: 

![image](/images/28.png)

Beautiful! our app is starting to look very pro! :)

Let's play with our new model file to define what we want from it.

As said previously, we installed __Mongoose__ a library that will allow us to do everything database related way more easely. is our model file related to our database? YES, so should we define our dependencies in the file too? YES.

Let's define Mongoose so we can use it.

```js
// DEPENDENCIES
const mongoose = require('mongoose');
```

Nice, then we will be able to use mongoose to create a new database table schema. in this case the user schema

```js
// SCHEMA
const UserSchema  = new mongoose.Schema();
```

the *Schema()* function takes one argument in the form of an object that will describe all the columns of our table. In this case the user. Some fields are mandatory for the features we will install.

1. EMAIL
2. PASSWORD
3. USERNAME

All other columns can be optional, or added afterwards if needed. We will talk about pictures upload later down this article.

Once all your fields added your schema should look something like this.

```js
// SCHEMA
const UserSchema  = new mongoose.Schema({
  username :{
      type  : String,
      required : true
  } ,
  email :{
    type  : String,
    required : true
  } ,
  password :{
    type  : String,
    required : true
  } ,
  creation_date :{
    type : Date,
    default : Date.now
  }
});
```
I, in this case simply added the creation date with a default value set as to be the current datetime at the moment of creation.

Perfect, we now have a Schema, look at the schema as if it was a Blueprint of our Model, but not our model yet.
That means that in order to have a working model we have to create it still.

for that we will add this line after our schema has been defined :

```js
// MODEL
const User = mongoose.model('User', UserSchema);
```
And to finnish, if we want to be able to use our model in other files we will have to export it. So we will finish our file by exporting our User model.

```js
module.exports = User;
```

If you followed all these steps, your __models/user.js__ file should look something like this

<details>
  <summary>See full page code</summary>

1. models/user.js
  ```js
    // DEPENDENCIES
    const mongoose = require('mongoose');

    // SCHEMA
    const UserSchema  = new mongoose.Schema({
      username :{
          type  : String,
          required : true
      } ,
      email :{
        type  : String,
        required : true
      } ,
      password :{
        type  : String,
        required : true
      } ,
      creation_date :{
        type : Date,
        default : Date.now
      }
    });

    // MODEL
    const User = mongoose.model('User', UserSchema);

    // EXPORT
    module.exports = User;
  ```
</details>

Allright!! we have our first Model! that's the first step into writing nice backend! Let's write our first controller

## 11 - Authentication : speed code some views


