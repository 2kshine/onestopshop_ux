# Use nginx base image
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built React app to nginx directory
COPY build /usr/share/nginx/html

# Expose ports for HTTP and HTTPS
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]