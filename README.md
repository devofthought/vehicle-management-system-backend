# VehiTrack Backend

Welcome to the backend repository of VehiTrack, the innovative Vehicle Management System designed to streamline your vehicle management experience. This backend repository is an integral part of the Binarydevs project, providing the server-side functionality for VehiTrack.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

VehiTrack is a comprehensive Vehicle Management System that aims to optimize resources, save time, and enhance the overall efficiency of handling a fleet of vehicles. The backend is responsible for handling data storage, processing business logic, and communicating with the frontend to provide a seamless user experience.

## Features

- **Efficient Vehicle Management:**

  - Detailed vehicle information: make, model, year, registration, and status.
  - Attachment of insurance, registration, and inspection documents.

- **Comprehensive Driver Management:**

  - Driver profiles with personal, contact, and license details.
  - Tracking performance, certifications, and training.

- **Helper Management:**

  - Maintenance of helper details for coordination.

- **Real-time Collaborative Chat System:**

  - Foster seamless communication among team members with an integrated chat system using Socket.io.

- **Seamless Trip Planning:**

  - Plan trips with details like departure, arrival, and assigned vehicles.
  - Record trip expenses, including fuel, tolls, and miscellaneous costs.

- **Smart Workshop and Maintenance:**

  - Schedule routine maintenance and log unscheduled events.
  - Document accidental maintenance, including costs.

- **Inventory and Stock Control:**

  - Monitor inventory and record items in/out.
  - Provide stock summaries for control.

- **Accident History Management:**

  - Track accidents with dates, locations, and damage details.
  - Attach relevant documents.

- **Paperwork and Document Management:**

  - Manage important documents such as tax, tokens, permits, registrations, and fitness.
  - Set reminders for renewals.

- **Accurate Expense Tracking:**

  - Categorize and track miscellaneous expenses.
  - Define expense heads for detailed reporting.

- **Financial Management Integration:**

  - Seamlessly integrate with financial systems to track income and expenses.
  - Generate comprehensive financial reports.

- **Reporting Option:**
  - Generate various reports, including vehicle and driver performance, maintenance logs, and financial summaries.
  - Provide customizable reporting options.

## Technology Stack

- **Node.js:** JavaScript runtime for server-side development.
- **Express.js:** Web application framework for Node.js.
- **Prisma:** Modern database access toolkit.
- **PostgreSQL:** Open-source relational database.
- **Socket.io:** Real-time bidirectional event-based communication.

## Getting Started

To get started with the VehiTrack backend, follow these steps:

1. Clone the repository: `git clone [repository_url]`
2. Install dependencies: `yarn add`
3. Set up the database and configure the environment variables.
4. Run the server: `yarn run dev`

For more detailed instructions and configuration options, refer to the [Documentation Link](https://docs.google.com/document/d/1p9UTRG0EbPuOUZziWcvhrJbCLFHpTxKn5TNf2t-Sji0/edit?usp=sharing).

## API Documentation

Explore the API endpoints and understand how to interact with the VehiTrack backend by referring to the [Postman API Documentation](https://documenter.getpostman.com/view/27398089/2s9YkuZJTB).

## Predefined User Accounts

### Super Admin

- **User ID:** SA00001
- **Password:** 123456

### Admin

- **User ID:** A00001
- **Password:** 123456

### Driver

- **User ID:** D00001
- **Password:** 123456

### Helper

- **User ID:** H00001
- **Password:** 123456

## License

This project is licensed under the [MIT License](#). Feel free to use, modify, and distribute it as per the terms of the license.
