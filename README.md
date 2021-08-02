# Poke Online Ordering Website
Spending most of my time on back-end development previously, I'm glad to deliver my first front-end focused project with React!

The structure of this poke ordering website came from the popular Udemy React course project "Burger Builder" by Maximillian. I found it quite suitable for the poke bowls I often order online, and that's how this variation comes.

## Ideas Behind
Dining out isn't always about food. The music, ambience, lightning and conversations are all memories you share with your beloved ones. When dining out becomes a luxury during the lockdown, why can't we, at least try to, simulate the onsite dining experience for ordering online? 

## Features
Site URL: https://lantings-poke.web.app/
### Ordering
The ordering steps imitates the common ordering process of poke bowls on online delivery  Apps. Users need to sign in before choosing at least one ingredient from the base, proteins, and toppings.

<p align="center"><img src="https://github.com/Fortissimo18/PokeBuilder/blob/main/demo/Order.gif" width="720" height="405" /></p>

After choosing the ingredients, users need to provide the delivery information by filling out the form.

<p align="center"><img src="https://github.com/Fortissimo18/PokeBuilder/blob/main/demo/ContactInfo.gif" width="720" height="405" /></p>

### Sign Up/ In

The sign up/in form can be switched with a toggle arrow without changing the URL. Input validity messages are shown in real-time when users type in.

<p align="center"><img src="https://github.com/Fortissimo18/PokeBuilder/blob/main/demo/SignUp.gif" width="720" height="405" /></p>

### View your Orders
Viewing your previous orders on the "My Account" page when signed in. Currently, the detailed order information including time, and delivery address, and the order management function is under development.

<p align="center"><img src="https://github.com/Fortissimo18/PokeBuilder/blob/main/demo/MyAccount.gif" width="720" height="405" /></p>

### Mobile Version UI
<p align="center"><img src="https://github.com/Fortissimo18/PokeBuilder/blob/main/demo/ContactInfo.PNG"/></p>



## Framework and Techs
This single-page web app uses React as the framework. Below are the detailed techs used: 
- Database: Firebase
- Inter-Class State Management: Redux
- HTTP Requests for posting and getting the data: Axios
- Hosting: Firebase
- Page Transition Animation: Framer Motion
### My Own Add Ups to the Original Project 
Apart from Maximillian's burger builder structure, I modified and added the following features:
1. Divided the ingredients into 3 different types (base, proteins, toppings), added the radio type selection for base ingredients.
2. Built a carousel on the order page to separate the ingredients selection steps.
3. Enhanced the sign up/in and contact info form validation, and error message display.
4. Animated cursor! A cool feature I always wanted to try. Got it done with React hooks.
5. Huge amount of responsive CSS re-designs, animations and page transitions. The most difficult parts were to display the ingredients in a circle, and binding the arrow with steps in the carousel. 

## Credits
Special thanks to these authors who gave me the inspirations:
1. The Popular Udemy Course:
- [React - The Complete Guide Course](https://www.udemy.com/course/react-the-complete-guide-incl-redux/) by Maximillian Schwarzmüller (Version before May 2021)

2. Genius CodePen Authors:
- [Animated Cursor](https://codepen.io/andrewchmr-the-vuer/pen/GRZjbbB) by Andriy Chemerynskiy
- [Carousel](https://codepen.io/jcoulterdesign/details/zdwajv) by Jamie Coulter
- [Sign Up/In Toggle](https://codepen.io/ig_design/pen/KKVQpVP) by Ivan Grozdic
- [Coffee Spinner](https://codepen.io/nazarelen/pen/zKwGdQ) by Elena Nazarova
- [Image Circle Display](https://codepen.io/KittyGiraudel/pen/vEJXGm) by Kitty Giraudel
- [Neon Light Effects](https://codepen.io/GeorgePark/details/MrjbEr) by George W.Park
- [Blackboard Check Effect](https://codepen.io/kristofferh/pen/MyOKMo) by Kris Hedstrome
- [Lifted Paper Strips](https://codepen.io/BastianAndre/pen/eBBvVz) by Bastian Andre
3. Freepik.com photo resources:
- [Order Page background image](https://www.freepik.com/photos/background) created by rawpixel.com
- [Sign Up/In Page background image](https://www.freepik.com/photos/food) created by freepik
- [Order Success Popup background image](https://www.freepik.com/photos/banner)  created by denamorado
- [My Account Page background image](https://www.freepik.com/photos/food) created by freepik
