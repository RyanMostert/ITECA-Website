# Fashion Fusion User Manual

Welcome to Fashion Fusion! This user manual will guide you through accessing and using the Fashion Fusion web application.

## Table of Contents

1. [Introduction](#introduction)
2. [Accessing the Website](#accessing-the-website)
3. [Navigating the User Interface](#navigating-the-user-interface)
4. [Using the Contact Form](#using-the-contact-form)
5. [Troubleshooting](#troubleshooting)
6. [Support](#support)

## Introduction

Fashion Fusion is an online platform designed for fashion enthusiasts. Whether you're looking for the latest trends, fashion tips, or ways to get in touch with us, Fashion Fusion has you covered.

## Accessing the Website

To access the Fashion Fusion website, open your preferred web browser and enter the following URL: 
Desktop: http://fashionfusion.myddns.me:3000/
Mobile: http://156.155.253.126:3000/
"Note that when using chrome on a mobile device the mobile link should be used since I do not hava a SSL certificate"


This will take you to the homepage of Fashion Fusion.

## Navigating the User Interface

### Header

At the top of every page, you'll find the header which includes navigation buttons to different sections of the website:

- **Home**: Takes you to the homepage.
- **About**: Learn more about Fashion Fusion.
- **Contact**: Get in touch with us via the contact form.

### Home Page

The home page provides an overview of Fashion Fusion and highlights key features and content.

### About Page

The about page gives you more information about Fashion Fusion, including our mission and team.

### Contact Page

The contact page allows you to send us a message directly through the website.
## Using the Description:
When viewing the shop a clear description button can be noticed on each product. When the user clicks on the description button a small pop up will appear, providing the user with a small description of the item.
## Using the Cart Page

After adding items to the cart, users can navigate to the Cart page to view and manage their selections. Please note that there is no actual payment system on this website as it is a dummy site.

1. **Navigate to the Login Page**: If not already logged in, users need to navigate to the Login page to access their cart.

2. **Register an Account (if needed)**:
    - If the user does not have an account, they can register by filling out the prompts on the Register page. Remember your username and password for future logins.

3. **Add Products to the Cart**:
    - While browsing the shop, logged-in users can add products to the cart by clicking the "Add to Cart" button associated with each product.

4. **View Cart**:
    - Users can click on the Cart icon or navigate to the Cart page to view all items currently in their cart.

5. **Checkout (Clear Cart)**:
    - To clear the cart, users can click on the "Checkout" button. This action will simulate clearing the cart, as there is no actual payment processing on this website.

## Using the Contact Form

The contact form is located on the Contact page. Here’s how to use it:

1. **Navigate to the Contact Page**: Click on the "Contact" button in the header.
2. **Fill Out the Form**:
    - **Name**: Enter your full name.
    - **Email**: Enter your email address.
    - **Message**: Type your message or inquiry.
3. **Submit the Form**: Click the "Submit" button. You will see a pop-up message saying "Email has been sent" once your message is successfully sent.

**Note:** The email service is currently non-functional. While you will receive a confirmation pop-up indicating that your message has been sent, please be aware that the email will not actually be delivered. We are working to resolve this issue.

### Example

```html
<form id="contactForm" onsubmit="event.preventDefault(); sendEmail();">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" placeholder="Your name.." required>

    <label for="email">Email</label>
    <input type="email" id="email" name="email" placeholder="Your email.." required>

    <label for="message">Message</label>
    <textarea id="message" name="message" placeholder="Write something.." style="height:200px" required></textarea>

    <div class="button">
        <button type="submit">Submit</button>
    </div>
</form>

