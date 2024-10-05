# Use Node.js base image
FROM node:18.20.3

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock into the container
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
# RUN yarn install --frozen-lockfile
RUN yarn install

# Copy the rest of the application into the container
COPY . .

# Build the NestJS app
RUN yarn build

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["node", "dist/main"]


