import navLocationIcon from "./assets/search-nav/nav-location-icon.svg";
import navBikeIcon from "./assets/search-nav/nav-bike-icon.svg";
import navCalendarIcon from "./assets/search-nav/nav-calendar-icon.svg";
import navGroupIcon from "./assets/search-nav/nav-group-icon.svg";

import bigSurImg from "./assets/destinations/big-sur.svg";
import prescottImg from "./assets/destinations/prescott.svg";
import fortMayersImg from "./assets/destinations/fort-mayers.svg";
import tucsonImg from "./assets/destinations/tucson.svg";
import stJosephImg from "./assets/destinations/st-joseph.svg";

import monasteroImg from "./assets/hotels-restaurants/monastero.svg";
import grandHotelImg from "./assets/hotels-restaurants/grand-hotel.svg";
import oberoiImg from "./assets/hotels-restaurants/oberoi.svg";
import beverlyHillsImg from "./assets/hotels-restaurants/beverly-hills.svg";
import ratingThree from "./assets/hotels-restaurants/rating-3.svg";
import ratingFour from "./assets/hotels-restaurants/rating-4.svg";
import ratingFive from "./assets/hotels-restaurants/rating-5.svg";

import tumb1 from "./assets/travel/tumb1.jpg";
import tumb2 from "./assets/travel/tumb2.jpg";
import tumb3 from "./assets/travel/tumb3.jpg";

import sailingImg from "./assets/activities/sailing.svg";
import climbingImg from "./assets/activities/climbing.svg";
import skiingImg from "./assets/activities/skiing.svg";
import hikingImg from "./assets/activities/hiking.svg";

export const navItems = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "Mental Health",
    path: "*",
    submenu: [{
      id: 1,
      name: "Professional",
      path: "/Professional"
    },]
  },
  {
    id: 3,
    name: "Test",
    path: "*",
    submenu: [{
      id: 1,
      name: "The Basic Test",
      path: "/BasicTest"
    },
    {
      id: 2,
      name: "Bipolar Disorder",
      path: "/BipolarDisorder"
    },
    {
      id: 3,
      name: "Generalized Anxiety Disorder",
      path: "/GAD"
    },
    {
      id: 4,
      name: "Major Depression",
      path: "/MajorDepression"
    },
    {
      id: 5,
      name: "PTSD",
      path: "/PTSD"
    }
  ]
  },
  {
    id: 4,
    name: "Disoders",
    path: "/disoders",

  },
  {
    id: 5,
    name: "About",
    path: "/aboutus",
  },
  {
    id: 6,
    name: "T & C",
    path: "*",

  },
];

export const searchNavItems = [
  {
    id: 1,
    normalText: "Location",
    boldText: "Explore nearby destinations",
    icon: navLocationIcon,
  },
  {
    id: 2,
    normalText: "Activity",
    boldText: "All activities",
    icon: navBikeIcon,
  },
  {
    id: 3,
    normalText: "When",
    boldText: "Choose a Date",
    icon: navCalendarIcon,
  },
  {
    id: 4,
    normalText: "Guests",
    boldText: "1 guest",
    icon: navGroupIcon,
  },
];

export const destinations = [
  {
    id: 1,
    name: "Big Sur",
    location: "California, USA",
    image: bigSurImg,
  },
  {
    id: 2,
    name: "Prescott",
    location: "Arizona, USA",
    image: prescottImg,
  },
  {
    id: 3,
    name: "Fort Mayers",
    location: "Florida, USA",
    image: fortMayersImg,
  },
  {
    id: 4,
    name: "Tucson",
    location: "Arizona, USA",
    image: tucsonImg,
  },
  {
    id: 5,
    name: "St. Joseph",
    location: "Michigan, USA",
    image: stJosephImg,
  },
];

export const hotelsRestaurants = [
  {
    id: 1,
    name: "Monastero Santa Rosa Hotel & Spa",
    location: "Salerno, Italy",
    image: monasteroImg,
    ratingImage: ratingFive,
  },
  {
    id: 2,
    name: "Grand Hotel Tremezzo",
    location: "Lake Como, Italy",
    image: grandHotelImg,
    ratingImage: ratingThree,
  },
  {
    id: 3,
    name: "The Oberoi Udaivilas, Udaipur",
    location: "Udaipur, India",
    image: oberoiImg,
    ratingImage: ratingFour,
  },
  {
    id: 4,
    name: "AKA Beverly Hills",
    location: "Los Angeles, United States",
    image: beverlyHillsImg,
    ratingImage: ratingThree,
  },
];

export const travelItems = [
  {
    id: 1,
    image: tumb1,
    location: "East Village Ice Cream Crawl",
    text: "Train your mind to be discipline, so you can be rational, Empathetic and not tribal.This will make you feel more human than ever. Greater things are yet to come!",
    calendarText: "Today",
    userText: "Maria Philips",
    commentsText: "2",
  },
  {
    id: 2,
    image: tumb2,
    location: "Know Thyself",
    text: "Self-awareness is the key to success.Knowing your limitations, Knowing your capabilities or simply knowing WHO YOU ARE will lead you to grate beyond ",
    calendarText: "Today",
    userText: "James Calzoni",
    commentsText: "17",
  },
  {
    id: 3,
    image: tumb3,
    location: "Conflict Resolution",
    text: "TPeaceful ending of a conflict of any form, brings inner peace to everyone.Here are some proven techniques that should be practiced by every human being ",
    calendarText: "Today",
    userText: "James Calzoni",
    commentsText: "17",
  },
];

export const activities = [
  {
    id: 1,
    name: "Sailing",
    image: sailingImg,
  },
  {
    id: 2,
    name: "Climbing",
    image: climbingImg,
  },
  {
    id: 3,
    name: "Skiing",
    image: skiingImg,
  },
  {
    id: 4,
    name: "Hiking",
    image: hikingImg,
  },
];

export const footerNav = [
  {
    id: 1,
    title: "About",
    links: ["About Us", "Features", "News", "Menu"],
  },
  {
    id: 2,
    title: "Company",
    links: ["Why beeze", "Partner With Us", "FAQ", "Blog"],
  },
  {
    id: 3,
    title: "Support",
    links: ["Account", "Support Center", "Feedback", "Contact Us"],
  },
];