import { FourthBg, primaryBg, SecondBg, ThirdBg } from "../assets/Images/Image";

export const Images = [
    {src:primaryBg}, 
    {src:SecondBg},
    {src:ThirdBg},
    {src:FourthBg}
];

export interface NavLink {
    name: string,
    href: string
}

export const navLinks: NavLink[] = [
    {name:'Home', href:'/Home'},
    {name:'Games', href:'/games'},
    {name:'About', href:'/About'},
    {name:'Contact', href:'/footer'},
];

export interface HeroContent {
    title: string,
    buttonText: string
}

export const heroContent: HeroContent[] = [
    {title:"Connecting Players & Games in an Immersive environment.", buttonText:'Become a Member for Free!'}
];

export interface Platforms {
    name: string
}

export interface GameCardProps {
    title: string
    company: string
    platform: string
    image: string
    rating: number
    order: string
    price: string
}

export const games: GameCardProps[] = [
    // Add your game objects here
];

export const footerLinks = [
    {
        title:'Services',
        links:[
            {name:'Our Stores'},
            {name:'Campaigns'},
            {name:'Tournaments'},
            {name:'Offline'}
        ]
    },
    {
        title:'About',
        links:[
            {name:'Our Story'},
            {name:'Benefits'},
            {name:'Team'},
            {name:'Careers'}
        ]
    },
    {
        title:'Help',
        links:[
            {name:'FAQs'},
            {name:'Contact Us'},
            {name:'Email :- sawariyasaurabh@gmail.com'},
            {name:'Phone :- +919258382181'}
        ]
    }
];