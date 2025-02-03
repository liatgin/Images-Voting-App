Running the app:
================
1. On your machine run: <git clone https://github.com/liatgin/Images-Voting-App.git>
2. Navigate to server directory and run: <docker-compose up --build>
   (this will build the fastApi server and the postgres db)
3. Open another CMD and navigate to client directory: then run:
- npm install
- npm run dev
4. Now you can go to <http://localhost:3000> and test the app

Notes:
======
1. I also made a docker-compose.yml that can be run with <docker-compose up --build> after cloning but it take
   very long time and ends without success so that is why I recommend to run the client localy.
2. The app stack is React + Typescript + Next.js on client side and FastAPI + Python on backend with PostgresSQL
3. Regarding the front: I thought it making sense to cache the images in localStorage since we using the same 100 images
   all the time but When I set the images in localStorage the app became very slow and since I had time constrains
   I decided not to investigatre the problem and not to cache the images.



