Running the App:
================
1. Clone the repository by running:
   <git clone https://github.com/liatgin/Images-Voting-App.git>

2. Navigate to the server directory and run:
   <docker-compose up --build>
   (This will build the FastAPI server and the PostgreSQL database.)

3. Open another command prompt (CMD), navigate to the client directory, then run:
   - npm install
   - npm run dev

4. Now you can open your browser and go to:
   <http://localhost:3000> to test the app.

Notes:
======
1. I also created a docker-compose.yml that can be used with <docker-compose up --build> after cloning the repository. However, it takes a long time to build and often ends without success.
   This is why I recommend running the client locally instead. (I believe there is a dependency issue causing the failure.)
2. The app stack consists of React + TypeScript + Next.js on the client side, and FastAPI + Python on the backend, with PostgreSQL as the database.
