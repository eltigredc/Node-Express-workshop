# Node Express introduction

## introduction V2

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

Before writing our first controller, let's be sure we have something to show our users if they want to sign_in or register.

in our views folder, we will add a new folder called __user__ in which we will put our already created __profile.ejs__ 

at the same time we will update the profile path in our __app.js__ to become

```js
app.get('/profile', (req, res) => {
  res.render('users/profile');
})
```

And we will create two new files inside __views/users__ in the form of __login.ejs__ and __register.ejs__

Our folder tree should look something like this :

![image](/images/30.png)

Nice, you also already create the __public/stylesheets/authentication.css__ file

You will find the code for these 3 files here :

<details>
  <summary>Click me</summary>
  
  1. public/stylesheets/authentication.css
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body{
  background-color: #fafafa;
  font-family: 'roboto', sans-serif;
}

main{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
}

.page{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
}

/* header style */
.page .header{
  text-align: center;
}

.page .header .logo, 
.page .header p, 
.page .header button{
  margin-bottom: 15px;
}

.page .header > p{
  font-weight: bold;
  color: #8e8e8e;
  font-size: 18px;
}

.page .header > button{
  width: inherit;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #0095f6;
  color: #ffffff;
}

.page .header div{
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #8e8e8e;
}

.page .header div p{
  padding: 0 20px;  
}

.page .header div hr{
  width: 200px;
  
}

/* container style*/
.page .container{
  display: flex;
  flex-direction: column;
}

.page .container form, input{
  width: inherit;
}

.page .container form input{
  border: 1px solid #dbdbdb;
  background-color: #fafafa;
  padding: 10px 5px;
  margin: 5px 0;
}

.page .container form input:last-of-type{
  margin-bottom: 10px;  
}

.page .container form button{
  width: inherit;
  margin-bottom: 20px;
  padding: 7px 20px;
  border-radius: 5px;
  border: none;
  background-color: #0095f6;
  color: #ffffff;
}

.page .container ul{
  list-style: none;
  text-align: center;
  margin-bottom: 10px;
}

.page .container ul li{
  display: inline;
  color: #8e9096;
}

.page .container ul li a{
  text-decoration: none;
  font-weight: bold;
  color: #8e9096;
}

/* option style */
.option p > a{
    text-decoration: none;
    color: #00a0f7;
}

/* otherapps style */
.otherapps{
  text-align: center;
}

.otherapps p{
  margin-bottom: 15px;
}

.otherapps > button{
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: black;
  color: white;
  padding: 10px;
  font-size: 18px;
}

/* footer style */
.footer{
  bottom: 0;
  height: 2.5rem;
  margin-top: 50px;
}

.footer ul{
  text-align: center;
}
.footer ul li{
  display: inline;
  margin-right: 5px;
}
.footer ul li a{
  text-decoration: none;
  font-size: 12px; 
  color: #00376b;
}

.footer p{
  margin: 10px 0;
  text-align: center;
  color: #8e9096;
  font-size: 14px;
}



/* Mobile Styles */

@media only screen and (max-width: 400px) {
    body {
        font-family: Freight Sans
    }
  
  .page{
    width: 250px;
    background-color: #fafafa;
  }
  
  .page .header{
    width: inherit;
    margin-top: 10px;
  }
  
  .page .container{
    width: inherit;
  }
  
  .option{
    margin: 80px 0;
  }
  
  .page .container input{
    padding: 10px 5px;
    margin: 5px 0;
  }
  
  .page .footer{
    width: inherith
  }
}

@media only screen and (min-width: 401px){
    body {
        font-family: Neue Helvetica
    }
  .page{
    border: 1px solid #dbdbdb;
    width: 350px;
    background-color: white;
    margin: 40px 40px 10px 40px;
  }
  
  .page .header{
    width: 270px;
    margin-top: 15px;
  }
  
  .page .container{
    width: 270px;
  }
  
  .option{
    border: 1px solid #dbdbdb;
    background-color: white;
    width: 350px;
    height: 70px;
    margin-top: 20px 0;
    display: flex; 
    align-items: center;
    justify-content: center;
    
  }
  
  .otherapps{
    margin: 20px 0;
  }
  
  .otherapps button{
    margin-right: 5px;
  }
  
  .otherapps button:after-of-type{
    margin-right: none;
  }
  
  .page .footer{
    width: 100%;
  }
}

  ```
  2. views/users/login.ejs

  ```ejs
  <link rel="stylesheet" href="/static/stylesheets/authentication.css">

<main>
  <div class="page">
      <div class="header">
        <h1 class="logo">Log In</h1>
      </div>
      <div class="container">
        <form action="">
          <input 
          type="email"
          name="email"
          placeholder="Enter email"
          value="<%= typeof email != 'undefined' ? email : '' %>">

          <input 
          type="password"
          name="password"
          placeholder="Enter password"
          value="<%= typeof password != 'undefined' ? password : '' %>">
          <button>Sign up</button>
        </form>
        
        <ul>
          <li>By signing up, you agree to our</li>
          <li><a href="">Terms</a></li>
          <li><a href="">Data Policy</a></li>
          <li>and</li>
          <li><a href="">Cookies Policy</a> .</li>
       </ul>
      </div>
  </div>
  <div class="option">
     <p>Don't Have an account? <a href="">Sign up</a></p>
  </div>
  <div class="otherapps">
    <p>Get the app.</p>
    <button type="button"><i class="fab fa-apple"></i> App Store</button>
    <button type="button"><i class="fab fa-google-play"></i> Google Play</button>
  </div>
  <div class="footer">
    <ul>
      <li><a href="">ABOUT</a></li>
      <li><a href="">HELP</a></li>
      <li><a href="">PRESS</a></li>
      <li><a href="">API</a></li>
      <li><a href="">JOBS</a></li>
      <li><a href="">PRIVACY</a></li>
      <li><a href="">TEMS</a></li>
      <li><a href="">LOCATIONS</a></li>
      <li><a href="">TOP ACCOUNTS</a></li>
      <li><a href="">HASHTAGS</a></li>
      <li><a href="">LANGUAGE</a></li>
    </ul>
    <p>© 2022 Instagram</p>
  </div>
</main>

  ```
  3. views/users/register.ejs

  ```ejs
  <link rel="stylesheet" href="/static/stylesheets/authentication.css">

<main>
  <div class="page">
      <div class="header">
        <h1 class="logo">Register</h1>
      </div>
      <div class="container">
        <form action="">
          <input 
          type="email"
          name="email"
          placeholder="Enter email"
          value="<%= typeof email != 'undefined' ? email : '' %>">

          <input 
          type="text"
          name="username"
          placeholder="Enter username"
          value="<%= typeof username != 'undefined' ? username : '' %>">

          <input 
          type="password"
          name="password"
          placeholder="Enter password"
          value="<%= typeof password != 'undefined' ? password : '' %>">
          <button>Sign up</button>

          <input 
          type="password"
          name="password_confirmation"
          placeholder="Enter password  confirmation"
          value="<%= typeof password_confirmation != 'undefined' ? password_confirmation : '' %>">

        </form>
        
        <ul>
          <li>By signing up, you agree to our</li>
          <li><a href="">Terms</a></li>
          <li><a href="">Data Policy</a></li>
          <li>and</li>
          <li><a href="">Cookies Policy</a> .</li>
       </ul>
      </div>
  </div>
  <div class="option">
     <p>Have an account? <a href="">Log in</a></p>
  </div>
  <div class="otherapps">
    <p>Get the app.</p>
    <button type="button"><i class="fab fa-apple"></i> App Store</button>
    <button type="button"><i class="fab fa-google-play"></i> Google Play</button>
  </div>
  <div class="footer">
    <ul>
      <li><a href="">ABOUT</a></li>
      <li><a href="">HELP</a></li>
      <li><a href="">PRESS</a></li>
      <li><a href="">API</a></li>
      <li><a href="">JOBS</a></li>
      <li><a href="">PRIVACY</a></li>
      <li><a href="">TEMS</a></li>
      <li><a href="">LOCATIONS</a></li>
      <li><a href="">TOP ACCOUNTS</a></li>
      <li><a href="">HASHTAGS</a></li>
      <li><a href="">LANGUAGE</a></li>
    </ul>
    <p>© 2022 Instagram</p>
  </div>
</main>
```
</details>

## 12. Authentication : My first controller

lets create our user controller to actually start and add some features to our app.

inside our __controllers__ folder, we will create a file called __users_controller.js__

Our folder tree now looks like this :

![image](/images/31.png)

nice, in our __users_controller.js__ file, we will first tackle the register function.

So let's create it.

```js
const register = (req, res) => {
    
} 
```
First of, we want to get back the user's input

```js
const register = (req, res) => {
    const {username,email, password, password_confirmation} = req.body;
} 
```
Then just to test it, we  will  print  out these values

```js
const register = (req, res) => {
    const {username,email, password, password_confirmation} = req.body;
    console.log(' username ' + username  + ' email :' + email + ' pass:' + password);
} 
```

Remember, if our app is a building, then each feature is an appartment, if we want to connect to one appartment, we need to know its number, its path, its route. 

until now we've defined all our routes inside our __app.js__ file, it was  fine when we only had one or two routes, but now that we have more, time to clean up our folder.

First, let's create a new folder called __routes__ and inside of it a new file called __users_router.js__ 

In our users_router file, we will need to first be sure that we have the dependencies we need. 
We will need to use a native function from __Express__ called router. So lets first call express, then define router.

```js
// DEPENDENCIES
const express = require('express');
const router = express.Router();
```

We will also need to import the controller we just created to be able to use it. but to be able to import, we also need to export, so for two seconds we will go back in our __users_controller.js__ file and add  at  the bottom :

```js
module.exports = {register};
```

Once that is done, we will be able to come back to our router and import it with the rest of our dependencies.

```js
// DEPENDENCIES
const express = require('express');
const router = express.Router();
const register = require('../controllers/users_controller.js').register
```

Once that's done, time to create our path. still in our router we are going to add the following code 

```js
// DEPENDENCIES
const express = require('express');
const router = express.Router();
const register = require('../controllers/users_controller.js').register

router.post('/register',(req,res) => register(req,res))

module.exports = router;
```

 First we define our route, on /register we will launch the register function that comes from our users_controller file. 

 We don't forget to export our router, because we still need to tell our app to actually use it.

 for that, let's go back into our app.js file and  we will add these beautiful lines of code :

```js
// ROUTES
app.use('/users',require('./routes/users_router'));
```

Nice!

Everything is connected, but we can't test it, that's because we are missing somewhere to a ctually see our  form.

Let's quickly add a path/route juste for that, and we are lucky we just created the right file for that. inside your __users_router.js__ file time to add a second and a third route, simply to display our previously created EJS files.

Your __users_router.js__ file should look this :

```js
// DEPENDENCIES
const express = require('express');
const router = express.Router();
const register = require('../controllers/users_controller.js').register


router.post('/register',(req,res) => register(req,res))

router.get('/login',(req,res)=>{
    res.render('users/login');
})

router.get('/register',(req,res)=>{
   res.render('users/register')
})

module.exports  = router;
```

and you should be able to access these two pages by navigating here : [register](http://localhost:3000/users/register), [login](http://localhost:3000/users/login)

SUPER!!!!!!!

Almost there, If you fill out the register form for the moment, nothing happens.

That is because our front-end form in our ejs file is not yet connected to our backend, it is very easily fixable though. For that, lets go back to our EJS file __views/users/register.ejs__ and update our HTML form by adding to it an _ACTION_ and a _Method_

```html
<form action="/users/register" method="POST">
```

the action corresponds to our path (our appartment number) route that we  have defined above.

1. action : the path given to the action comes from two places, the "/users" comes from the general route as defined in our __app.js__ file, the "/register" part comes from our router, it is the sub-route, we are uin the _users_ appartment, but entering the _register_ room.

2. The action POST comes from the method also defined in our router. 

![image](/images/32.png)

Cool, now that that is done, you  should be able to fill out  the register form once again and see that we now get an error.

![image](/images/33.png)

Weird, and annoying, but actually good news, that means that our frontend speaks with oour backend, even if it gets messed up.

Luckily, the solution is quite simple, we are just missing a few setup lines once again.
Let's go back to our __app.js__ and under our SETUP chapter, we will add these few lines: 

```js
app.use(express.urlencoded({extended : false}));
app.use(express.json())
```

You'll find more infos about these setup options [here](https://expressjs.com/en/api.html) but for now, let's just say that they allow you to  play with  JSON as data and that  is pretty neat.

Once these lines are added, fill out the register form once again and open your terminal. 

if your terminal prints out what you filled out, everything is right and you can go to the next step!
![image](/images/34.png)


## 13. Authentication : Register

Okay, we  now have a working link between our front-end and our back-end but our register function is not the most complete right now.

In  our __users_controller.js__ file,  let's continue our register function.

First, we want to have some error handling setted up so that we don't just save bad data in our database.

for that we'll first  define an empty error array.

```js
const register = (req, res) => {
    const {username,email, password, password_confirmation} = req.body;
    console.log(' username ' + username  + ' email :' + email + ' pass:' + password);

    const errors = []
} 


module.exports = {register};
```

then we will add some errors use-cases:

1. Check if all the fields have been filled
2. Check if the passwords match
3. Check if the password is more than 6 characters

If the check passes for any of them, we push an error message inside our previously created array.

```js
const register = (req, res) => {
    const {username,email, password, password_confirmation} = req.body;
    console.log(' username ' + username  + ' email :' + email + ' pass:' + password);

    const errors = []

    // check if all fields have been filled
    if(!username || !email || !password || !password_confirmation) {
        errors.push({msg : "Please fill in all fields"})
    }
    //check if match
    if(password !== password_confirmation) {
        errors.push({msg : "passwords dont match"});
    }

    //check if password is more than 6 characters
    if(password.length < 6 ) {
        errors.push({msg : 'password atleast 6 characters'})
    }
} 


module.exports = {register};
```


Then, we check if there is some errors, if there is we rerender the same page, passing it the same values as well as the errors

```js
const register = (req, res) => {
    const {username,email, password, password_confirmation} = req.body;
    console.log(' username ' + username  + ' email :' + email + ' pass:' + password);

    const errors = []

    // check if all fields have been filled
    if(!username || !email || !password || !password_confirmation) {
        errors.push({msg : "Please fill in all fields"})
    }
    //check if match
    if(password !== password_confirmation) {
        errors.push({msg : "passwords dont match"});
    }

    //check if password is more than 6 characters
    if(password.length < 6 ) {
        errors.push({msg : 'password atleast 6 characters'})
    }

    if(errors.length > 0 ) {
    res.render('users/register', {
        errors : errors,
        username : username,
        email : email,
        password : password,
        password_confirmation : password_confirmation})
     }

} 


module.exports = {register};
```

if there is no errors we can go to next step which is to save the data entered inside the database. but for that we will need to import a few things in our file.

1. we will need to import our USER Model, as it with ot  that we are going to interact as in our database.

```js
//DEPENDENCIES
const User = require("../models/user");
```

2. We will need to install and import yet another library, this one is called [bcrypt](https://www.npmjs.com/package/bcrypt) it will help enhance the security of our app hashing our passwords. Why should we do that, [check it out](https://auth0.com/blog/hashing-passwords-one-way-road-to-security/)

let's do it then, by once again running 

```bash
npm install bcrypt --save
```

and at the top of our file

```js
//DEPENDENCIES
const User = require("../models/user");
const bcrypt = require('bcrypt');
```

Nice now that we have everything we need, we can play around our register function even more.

so, when there's no user error, the first thing we want to be sure of is that there is not two times the same email registered inside our database.


```js
//DEPENDENCIES
const User = require("../models/user");
const bcrypt = require('bcrypt');

const register = (req, res) => {
    const {username,email, password, password_confirmation} = req.body;
    console.log(' username ' + username  + ' email :' + email + ' pass:' + password);

    const errors = []

    // check if all fields have been filled
    if(!username || !email || !password || !password_confirmation) {
        errors.push({msg : "Please fill in all fields"})
    }
    //check if match
    if(password !== password_confirmation) {
        errors.push({msg : "passwords dont match"});
    }

    //check if password is more than 6 characters
    if(password.length < 6 ) {
        errors.push({msg : 'password atleast 6 characters'})
    }

    if(errors.length > 0 ) {
    res.render('users/register', {
        errors : errors,
        username : username,
        email : email,
        password : password,
        password_confirmation : password_confirmation})
     }else{
        User.findOne({email : email}).exec((err,user)=>{
          console.log(user);
          if(user) {

          }else{

          }
        })
     }

} 


module.exports = {register};

```

If we find a user, we create a new error message, and we re-render the page

```js
//DEPENDENCIES
const User = require("../models/user");
const bcrypt = require("bcrypt");


const register = (req, res) => {
    const {username,email, password, password_confirmation} = req.body;
    console.log(' username ' + username  + ' email :' + email + ' pass:' + password);

    const errors = []

    // check if all fields have been filled
    if(!username || !email || !password || !password_confirmation) {
        errors.push({msg : "Please fill in all fields"})
    }
    //check if match
    if(password !== password_confirmation) {
        errors.push({msg : "passwords dont match"});
    }

    //check if password is more than 6 characters
    if(password.length < 6 ) {
        errors.push({msg : 'password atleast 6 characters'})
    }

    if(errors.length > 0 ) {
    res.render('users/register', {
        errors : errors,
        username : username,
        email : email,
        password : password,
        password_confirmation : password_confirmation})
     }else{
        User.findOne({email : email}).exec((err,user)=>{
          console.log(user);
          if(user) {
            errors.push({msg: 'email already registered'});
            res.render('register',{errors,username,email,password,password_confirmation})
          }else{
            
          }
        })
     }

} 


module.exports = {register};
```

If we don't an user that means that we can save it to the database

```js
//DEPENDENCIES
const User = require("../models/user");
const bcrypt = require("bcrypt");


const register = (req, res) => {
    const {username,email, password, password_confirmation} = req.body;
    console.log(' username ' + username  + ' email :' + email + ' pass:' + password);

    const errors = []

    // check if all fields have been filled
    if(!username || !email || !password || !password_confirmation) {
        errors.push({msg : "Please fill in all fields"})
    }
    //check if match
    if(password !== password_confirmation) {
        errors.push({msg : "passwords dont match"});
    }

    //check if password is more than 6 characters
    if(password.length < 6 ) {
        errors.push({msg : 'password atleast 6 characters'})
    }

    if(errors.length > 0 ) {
    res.render('users/register', {
        errors : errors,
        username : username,
        email : email,
        password : password,
        password_confirmation : password_confirmation})
     }else{
        User.findOne({email : email}).exec((err,user)=>{
          console.log(user);
          if(user) {
            errors.push({msg: 'email already registered'});
            res.render('register',{errors,username,email,password,password_confirmation})
          }else{
            const newUser = new User({
                username : username,
                email : email,
                password : password
            });

            //hash password
            bcrypt.genSalt(10,(err,salt)=>
            bcrypt.hash(newUser.password,salt,
                (err,hash)=> {
                    if(err) throw err;
                        //save pass to hash
                        newUser.password = hash;
                    //save user
                    newUser.save()
                    .then((value)=>{
                        console.log(value)
                        res.redirect('/users/login');
                    })
                    .catch(value=> console.log(value));

                }));
          }
        })
     }

} 


module.exports = {register};
```

First, we create a new user Using the User Model that we imported earlier. 

Then, we use the bcrypt library in order to hash the new user's password. once it's done, we redirect the user to the login page so he can login

Time to test it up.

Let's fill all the fields again and see  what happens.

If your terminal shows you this prompt it means that  everything worked :

![image](/images/35.png)

You can also go back to  your mongodb  atlas page, on your cluster, then on the "collection" tab, to see that it has indeed been saved.

![image](/images/36.png)


## 14. Authentication : error messages

We created a bunch of error messages but we don't do anything with them, which is quite sad, so let do something  about it.

Inside our __views__  folder, we will create another folder called __partials__ these will be snippets of code that  we will be able to reuse troughout our app.

Inside this folder, we will create a file called __messages.ejs__

and inside, we will add the following EJS code

```ejs
<% if(typeof errors!= 'undefined') { %>
<%    errors.forEach(function(error){ %>
        <p> <%= error.msg %></p>
<%    })        %>
<% } %>
```

and inside our __register.ejs__ file we will update it by adding 

```ejs
    <div class="header">
        <h1 class="logo">Register</h1>
        <%- include ('./partials/messages') %>
    </div>
```

You can now test it out, you should be able to see the error messages when you try to submit a form that has errors

BRAVO!

We are almost there, we'll add the login part of our code and we'll almost be done with authentication


## 15. Authentication : Login

Allright, time to login! 

as login in, is a new feature, lets create a new function inside our __users_controller.js__ file

this function will be called login

```js
const login = (req, res, next) => {

}
```

In order to fill this function we will need yet again, another library. This one is called [passport](https://www.npmjs.com/package/passport) 

*=> Passport is Express-compatible authentication middleware for Node.js.
Passport's sole purpose is to authenticate requests, which it does through an extensible set of plugins known as strategies. Passport does not mount routes or assume any particular database schema, which maximizes flexibility and allows application-level decisions to be made by the developer. The API is simple: you provide Passport a request to authenticate, and Passport provides hooks for controlling what occurs when authentication succeeds or fails.*

Install Passport 

```bash
npm install passport --save
```

Once passport is installed, we'll need to call it as dependency at the top of our file.

```js
//DEPENDENCIES
const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport")
```

Once installed, we can use its build function quite simply in order to authenticate our user and we don't forget to export it alongside the "register" function.

```js
const login = (req, res, next) => {
    passport.authenticate('local',{
        successRedirect : '/',
        failureRedirect: '/users/login',
        failureFlash : true
    })(req,res,next)
}

module.exports = {register, login};
```

Nice, we still need to hook it up to a route/path/appartment number. let's open our  __users_router.js__ and add our new function

```js
// DEPENDENCIES
const express = require('express');
const router = express.Router();
const register = require('../controllers/users_controller.js').register
const login = require('../controllers/users_controller.js').login

router.post('/register',(req,res) => register(req,res))
router.post('/login',(req,res, next) => login(req,res,next))

router.get('/login',(req,res)=>{
    res.render('users/login');
})

router.get('/register',(req,res)=>{
   res.render('users/register')
})

module.exports  = router;
```

and to finnish, we can't forget to  update our action and method  in our form inside __login.ejs__

```ejs
    <form action="/users/login" method="POST">
```

and once that's done, we can test it!

Shit, it does not work, if you this error, that means that we are on the right path, but still missing something.

![image](/images/37.png)

You might have guessed it, but we need a little more setup to make passport work for us.

1. First, at the  root of our app, create a folder called __config__, inside, create two files, the first, __auth.js__, the second, __passport.js__

in the first one (__auth.js__) put this code :

```js
module.exports = {
    ensureAuthenticated : function(req,res,next) {
        if(req.isAuthenticated()) {
            return next();
        }
        res.redirect('/users/login');
    }
}
```

This little snippet will allow us to control if a user is authenticated or not, and to allow a user to access certain pages.

in the second one (__passport.js__) you can put this code  :

```js

const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField: 'email'},(email,password,done)=>{
            //match user
            User.findOne({email:email})
            .then((user)=>{
                if(!user){
                    return done(null,false,{message:'email not registered'});
                }
                //math passwords
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err) throw err;
                    if(isMatch){
                        return done(null,user);
                    } else{
                        return done(null,false,{message: 'password incorrect'});
                    }
                })
            })
            .catch((err)=>{console.log(err)})
        })
    )
    passport.serializeUser(function(user,done) {
        done(null,user.id);
    })
    passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            done(err,user);
        })
    })
}
```

This is the code used by passport to check wether or not a login can occur. Asyou are very curious, I'm sure that  you saw that this fileis using alibrary  that we never used before, so  what are you waiting for to dowwnload the  library?

```bash 
npm install passport-local --save
```

And too finnish, let's add a little setup line in our __app.js__ as well as our passport dependency

```js
//DEPENDENCIES
const passport = require("passport")
//SETUP
require('./config/passport')(passport)
```

And everything is right, you  should come accross this error when you try to login.


![image](/images/38.png)

This is a quite verbose error, that puts us in the right direction. we are indeed missing a library called __express-session__

Let's install it!

```bash
npm install express-session --save
```

and again, in our __app.js__ file, we'll haveto add a setup line, as well as a dependency.

```js
    //DEPENDENCIES
    const session = require("express-session")
    //SETUP
    app.use(session({
        secret : 'secret',
        resave : true,
        saveUninitialized : true
    }));

    app.use(passport.initialize());

    app.use(passport.session());
```

and by reloading the page, you can see that you should now have access to the page!


## 16. Authentication : Permissions

Let's talk permissions, what do we mean by that, we just installed a pretty neat authentication system, but for the moment, any user can just change the url manually and access any page he wants.

NO GOOD!

So we need permissions, in this app, permissions are not that hard to set up, there is  only two levels, connected and n ot connected.

If you are connected, you should be able to see all the pages of the app.

If you are not connected, every time you try to access a page you should be redirected to the login page.

We actually already set up that code earlier in our __config/auth.js__ file. so, let's take the building analogy. only if I've been invited inside, or if i have the key Only  then I  can enter the building to go to a specific appartment. It is going to be the same here.

Inside __app.js__ we've defined the home path, path  that should only be accessible to authenticated persons.

To set that up, we'll first add our config file in our dependencies.

```js
//DEPENDENCIES
const {ensureAuthenticated} = require('./config/auth')
```

then, where we actually defined the path, we are going to add our config file as argument. 

```js
app.get('/', ensureAuthenticated, (req, res) => {
  res.render('home');
})

```

If you can't see it, try loading your localhost in incognito mode :)

You can use the same technique everywhere you want to protect a doorbell.

## 17. Posts create a new post

It is now time to tackle our second model and actions on the app. posts. every user can create a post and you can see for  the moment, either: 

1. all the posts of every users on the homepage.

2. just your posts on the  profile page.

The first step will either way be to create a new model in our __models__ folder, the __post.js__ model.

Just as a recap, here is the state of our folder tree for the moment

![image](/images/39.png)

in our post model, we will add like for the user the schema code.

```js
// DEPENDENCIES
const mongoose = require('mongoose');

// SCHEMA
const PostSchema  = new mongoose.Schema({
  name: String,
  desc: String,
  img_url: {
      type  : String,
      required : true
  }
});

// MODEL
const Post = mongoose.model('Post', PostSchema);

// EXPORT
module.exports = Post;
```

Then we will need an actual page for the users to use. so we will create a new folder in our views called __posts__ and inside a new file called __new.ejs__

and code a form page for a new post

<details>
  <summary>Click me</summary>
  
  1. __views/posts/new.ejs__
  ```html
  <link rel="stylesheet" href="/static/stylesheets/authentication.css">

<main>
  <div class="page">
      <div class="header">
        <h1 class="logo">New Post</h1>
      </div>
      <div class="container">
        <form action="/posts/new" enctype="multipart/form-data" method="POST">
          <input 
          type="name"
          name="name"
          placeholder="Enter name"
          value="<%= typeof name != 'undefined' ? name : '' %>">

          <input 
          type="desc"
          name="desc"
          placeholder="Enter legend"
          value="<%= typeof desc != 'undefined' ? desc : '' %>">

          <input type="file" name="img" accept="image/*">
          <button>Create A new post/button>
        </form>
        
        <ul>
          <li>By signing up, you agree to our</li>
          <li><a href="">Terms</a></li>
          <li><a href="">Data Policy</a></li>
          <li>and</li>
          <li><a href="">Cookies Policy</a> .</li>
       </ul>
      </div>
  </div>
  <div class="option">
     <p>Don't Have an account? <a href="">Sign up</a></p>
  </div>
  <div class="otherapps">
    <p>Get the app.</p>
    <button type="button"><i class="fab fa-apple"></i> App Store</button>
    <button type="button"><i class="fab fa-google-play"></i> Google Play</button>
  </div>
  <div class="footer">
    <ul>
      <li><a href="">ABOUT</a></li>
      <li><a href="">HELP</a></li>
      <li><a href="">PRESS</a></li>
      <li><a href="">API</a></li>
      <li><a href="">JOBS</a></li>
      <li><a href="">PRIVACY</a></li>
      <li><a href="">TEMS</a></li>
      <li><a href="">LOCATIONS</a></li>
      <li><a href="">TOP ACCOUNTS</a></li>
      <li><a href="">HASHTAGS</a></li>
      <li><a href="">LANGUAGE</a></li>
    </ul>
    <p>© 2022 Instagram</p>
  </div>
</main>

  ```
</details>

Nice, now that we have our Model, we have our View,  what are we missing?? A controller!!!!

so we'll create a __controllers/posts_controller.js__ 

and in it we will write the same setup code as we did before for user, just to be sure that everything speaks with each-other correctly.

```js
// DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
const Post = require("../models/post");

const create = (req, res) => {
    console.log("Im ready to create a new post")
}


module.exports = { create }
```
Next, if we have a view, a model and a controller, we only need one thing to link it to our __app.js__ file.

And thats a Router.

So, let's create our __posts_router.js__ and already link it with our controller

```js
const express = require('express');
const router = express.Router();
const create = require('../controllers/posts_controller.js').create

router.get('/new',(req,res)=>{
    res.render('posts/new');
})

router.post('/create', (req,res) => create(req,res))


module.exports = router;
```

And to finish, we will have to link our router to our __app.js__ by adding

```js
app.use('/posts',require('./routes/posts_router'));
```

to our base routes.

Nice, all our files are setted up. you can test them by simply going to localhost:3000/posts/new, submitting the form and check if you receive a message in your terminal.

If so, let's go to the next step.

In order to continue our app and to allow us to actually upload a picture onto the platform, we will need three new packages, 

1. Cloudinary (npm package to manage Cloudinary inside a node application).

2. Dotenv (to configure and use environment variables).

3. Multer (for file upload).

soooo let's run,

```bash
npm install dotenv cloudinary multer --save
```

Nice, one of the packages you just installed is cloudinary. it is a media hosting platform, like Mongodb, it has a pretty generous free-tier usage, so we will use that.

Just know that if you upload more than a certain size of media, they will block your account until you pay

So first step, will be to create an account on [cloudinary](https://cloudinary.com/).

Once that is done, you should be able to access a dashboard like this one :

![image](/images/40.png)

On this dashboard you'll find all the infos needed to create your __.env__ file, if you don't know what is a __.env__ file, it is a file where you can store all your sensible info, file that you should NEVER share with anyone.

create this file and in it write :

```
CLOUD_NAME = <YOUR - CLOUD - NAME>
API_KEY = <YOUR - API - KEY>
API_SECRET = <YOUR - API - SECRET>
```
once thats done, go back to our __config__ folder and create inside of it, two new files, __multer.js__ and __cloudinary.js__

Open __cloudinary.js__ and write down the code. 

```js
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
module.exports = cloudinary;
```

Then you need to set up multer to facilitate file upload. Open __multer.js__ and write code as

```js
const multer = require("multer");
const path = require("path");
// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("Unsupported file type!"), false);
      return;
    }
    cb(null, true);
  },
});
```

