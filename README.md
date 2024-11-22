# Role-Based Acces Control

## Techstack - React, Recoil, ShadcnUI

## Features

-  Multiple role control of member.
-  Different access of operations to each member based on their role.
-  Permissions overriding over another member based on priority of the member (Admin have higher priority than Manager and so on).
-  Create new member or a new role.
-  Change role or status of members.
-  Search functionality for the members.

There are 3 roles default as Admin, Manager and User and 4 permissions default (immutable) as create, read, update and delete.

## Getting Started

### Prerequisites

-  Node.js 18.0 or higher
-  npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone https://github.com/psapkale/role-based-access-control.git
cd role-based-access-control
```

2. Install dependencies

```bash
npm install
```

```bash
yarn install
```

4. Start the development server

```bash
npm run dev
```

## Usage

Login as `Admin` to access all the features as mentioned.
Try to create user or a new role using tabs in the dashboard
