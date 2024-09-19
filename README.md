# Travel Agency App

NomadNavigators is a full-stack travel agency application that provides a seamless experience for booking flights, restaurants, and tourist attractions. This project demonstrates the use of modern web technologies for both frontend and backend development.

## Features

- User authentication and authorization
- Flight booking
- Restaurant reservations
- Tourist attraction planning
- User reviews and ratings
- Responsive design for mobile and desktop

## Tech Stack

### Frontend
- React
- React Router DOM
- Tailwind CSS
- Material-UI (MUI)
- React Icons

### Backend
- .NET Core
- C#
- RESTful API (MVC architecture)
- SQL Server
- Entity Framework Core


### Hosting
- Azure

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- .NET Core SDK (v6.0 or later)
- SQL Server

### Installation

1. Clone the repository
   ```
   git clone https://github.com/SyedHuzaifa417/NomadNavigators-REACT.JS.git
   git clone https://github.com/SyedHuzaifa417/NomadNavigators-ASP.NET-CORE.git
   ```

2. Frontend setup
   ```
   cd NomadNavigators-REACT.JS
   npm install
   ```

3. Backend setup
   ```
   cd NomadNavigators-ASP.NET-CORE
   dotnet restore
   ```

4. Database setup
   - Create a new SQL Server database
   - Update the connection string in `appsettings.json`

5. Run migrations
   ```
   dotnet ef database update
   ```

### Running the application

1. Start the backend server
   ```
   cd NomadNavigators-ASP.NET-CORE
   dotnet run
   ```

2. Start the frontend development server
   ```
   cd NomadNavigators-REACT.JS
   npm rub dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Contributing

We welcome contributions to the TravelEase Agency App! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Thanks to all the open-source libraries and frameworks that made this project possible.
- Special thanks to our beta testers and early adopters for their valuable feedback.
