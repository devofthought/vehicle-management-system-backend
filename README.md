### Live Link: https://vms-system-backend.vercel.app


### Application Routes:

### Auth

- api/v1/auth/login (POST)
- api/v1/auth/logout (POST)
- api/v1/auth/refresh-token (GET)

### User

- api/v1/user/create-super-admin (POST)
- api/v1/user/create-admin (POST)
- api/v1/user/create-driver (POST)
- api/v1/user/create-helper (POST)

### Super Admin

- api/v1/super-admin (GET)
- api/v1/super-admin/:id (GET)
- api/v1/super-admin/:id (PATCH)
- api/v1/super-admin/:id/inactive (PATCH)

### Admin

- api/v1/admin (GET)
- api/v1/admin/:id (GET)
- api/v1/admin/:id (PATCH)
- api/v1/admin/:id/inactive (PATCH)

### Driver

- api/v1/driver (GET)
- api/v1/driver/:id (GET)
- api/v1/driver/:id (PATCH)
- api/v1/driver/:id/inactive (PATCH)

### Helper

- api/v1/helper (GET)
- api/v1/helper/:id (GET)
- api/v1/helper/:id (PATCH)
- api/v1/helper/:id/inactive (PATCH)

### Brand

- api/v1/brand/create (POST)
- api/v1/brand (GET)
- api/v1/brand/:id (GET)
- api/v1/brand/:id (PATCH)

### Model

- api/v1/model/create (POST)
- api/v1/model (GET)
- api/v1/model/:id (GET)
- api/v1/model/:id (PATCH)

### Vehicle

- api/v1/vehicle/create (POST)
- api/v1/vehicle (GET)
- api/v1/vehicle/:id (GET)
- api/v1/vehicle/:id (PATCH)
- api/v1/vehicle/:id/inactive (PATCH)

### Party

- api/v1/party/create (POST)
- api/v1/party (GET)
- api/v1/party/:id (GET)
- api/v1/party/:id (PATCH)
- api/v1/party/:id/inactive (PATCH)

### Trip

- api/v1/trip/create (POST)
- api/v1/trip (GET)
- api/v1/trip/:id (GET)
- api/v1/trip/:id (PATCH)
- api/v1/trip/:id (DELETE)
- api/v1/trip/:id/trip-expense (PATCH)

### Account Type

- api/v1/account-type/create (POST)
- api/v1/account-type (GET)
- api/v1/account-type/:id (GET)
- api/v1/account-type/:id (PATCH)

### Account Head

- api/v1/account-head/create (POST)
- api/v1/account-head (GET)
- api/v1/account-head/:id (GET)
- api/v1/account-head/:id (PATCH)

### Expense Head

- api/v1/expense-head/create (POST)
- api/v1/expense-head (GET)
- api/v1/expense-head/:id (GET)
- api/v1/expense-head/:id (PATCH)

### Expense

- api/v1/expense/create (POST)
- api/v1/expense (GET)
- api/v1/expense/:id (GET)
- api/v1/expense/:id (PATCH)
- api/v1/expense/:id (DELETE)

### Fuel Type

- api/v1/fuel-type/create (POST)
- api/v1/fuel-type (GET)
- api/v1/fuel-type/:id (GET)
- api/v1/fuel-type/:id (PATCH)

### Fuel Station

- api/v1/fuel-station/create (POST)
- api/v1/fuel-station (GET)
- api/v1/fuel-station/:id (GET)
- api/v1/fuel-station/:id (PATCH)

### Fuel

- api/v1/fuel/create (POST)
- api/v1/fuel (GET)
- api/v1/fuel/:id (GET)
- api/v1/fuel/:id (PATCH)
- api/v1/fuel/:id (DELETE)

### Unit of Measurement

- api/v1/uom/create (POST)
- api/v1/uom (GET)
- api/v1/uom/:id (GET)
- api/v1/uom/:id (PATCH)

### Equipment

- api/v1/equipment/create (POST)
- api/v1/equipment (GET)
- api/v1/equipment/:id (GET)
- api/v1/equipment/:id (PATCH)

### Equipment In

- api/v1/equipment-in/create (POST)
- api/v1/equipment-in (GET)
- api/v1/equipment-in/:id (GET)
- api/v1/equipment-in/:id (PATCH)
- api/v1/equipment-in/:id (DELETE)

### Maintenance Head

- api/v1/maintenance-head/create (POST)
- api/v1/maintenance-head (GET)
- api/v1/maintenance-head/:id (GET)
- api/v1/maintenance-head/:id (PATCH)

### Maintenance

- api/v1/maintenance/create (POST)
- api/v1/maintenance (GET)
- api/v1/maintenance/:id (GET)
- api/v1/maintenance/:id (PATCH)
- api/v1/maintenance/:id (DELETE)

### Accident History

- api/v1/accident-history/create (POST)
- api/v1/accident-history (GET)
- api/v1/accident-history/:id (GET)
- api/v1/accident-history/:id (PATCH)
- api/v1/accident-history/:id (DELETE)

### Paper Work

- api/v1/paper-work/create (POST)
- api/v1/paper-work (GET)
- api/v1/paper-work/:id (GET)
- api/v1/paper-work/:id (PATCH)
- api/v1/paper-work/:id (DELETE)
