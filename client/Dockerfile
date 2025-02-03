# Step 1: Build the React app
FROM node:22.13.1 AS build

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the React app for production
RUN npm run build

# Step 2: Serve the React app with a simple HTTP server
FROM nginx:alpine

# Copy the build folder from the previous build stage to the nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to access the app
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
