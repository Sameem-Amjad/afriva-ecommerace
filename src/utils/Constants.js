import {
  ApplePayIcon,
  facebookIcon,
  githubIcon,
  GooglePayIcon,
  instaIcon,
  mailButtonIcon,
  MasterCardIcon,
  passwordButtonIcon,
  PayPalIcon,
  successButtonIcon,
  twitterIcon,
  userButtonIcon,
  VisaCardIcon,
} from "./Svgs";

export const forgetSteps = [
  {
    icon: userButtonIcon,
    title: "Your details",
    description: "Please provide your name and email.",
  },
  {
    icon: mailButtonIcon,
    title: "Check your email",
    description: "Please check your email to get reset link.",
  },
  {
    icon: passwordButtonIcon,
    title: "Choose a password",
    description: "Choose a secure password.",
  },
  {
    icon: successButtonIcon,
    title: "Successfully",
    description: "Go back to log in into your account.",
  },
];

export const stats = [
  {
    number: "200+",
    text: "International Brands",
  },
  {
    number: "",
    text: "",
  },
  {
    number: "2,000+",
    text: "High-Quality Products",
  },
  {
    number: "",
    text: "",
  },
  {
    number: "30,000+",
    text: "Happy Customers",
  },
];

export const socials = [
  {
    icon: twitterIcon,
    link: "https://twitter.com/",
  },
  {
    icon: facebookIcon,
    link: "https://facebook.com/",
  },
  {
    icon: instaIcon,
    link: "https://instagram.com/",
  },
  {
    icon: githubIcon,
    link: "https://github.com/",
  },
];

export const companyLinks = [
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Features",
    link: "/features",
  },
  {
    title: "Works",
    link: "/works",
  },
  {
    title: "Career",
    link: "/career",
  },
];

export const helpLinks = [
  {
    title: "Customer Support",
    link: "/customer-support",
  },
  {
    title: "Delivery Details",
    link: "/delivery-details",
  },
  {
    title: "Terms & Conditions",
    link: "/terms",
  },
  {
    title: "Privacy Policy",
    link: "/privacy-policy",
  },
];

export const faqLinks = [
  {
    title: "Account",
    link: "/profile/account",
  },
  {
    title: "Manage Deliveries",
    link: "/manage-deliveries",
  },
  {
    title: "Orders",
    link: "/profile/orders",
  },
  {
    title: "Payments",
    link: "/profile/payments",
  },
];

export const cards = [
  VisaCardIcon,
  MasterCardIcon,
  PayPalIcon,
  ApplePayIcon,
  GooglePayIcon,
];

export const productTabs = ["Product Details", "Rating & Reviews", "Return Policy"];
