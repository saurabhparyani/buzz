FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install pnpm and dependencies in one RUN to optimize layers
RUN npm install -g pnpm && pnpm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port specified in the .env file (8000 in this case)
EXPOSE 8000

# Start the application in development mode
CMD ["npm", "run", "dev"]
