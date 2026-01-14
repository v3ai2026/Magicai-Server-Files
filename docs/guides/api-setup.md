# API Setup Guide

This guide will help you set up and configure the API endpoints for your MagicAI server.

## Overview

The API is organized in a RESTful structure with versioned endpoints. All API routes are prefixed with `/api/v1`.

## Authentication

Most API endpoints require authentication using JWT tokens.

### Getting a Token

```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your-password"
}
```

### Using the Token

Include the token in the Authorization header:

```bash
GET /api/v1/users/profile
Authorization: Bearer your-jwt-token-here
```

## Common Endpoints

### User Management

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/users/profile` - Get current user profile
- `PUT /api/v1/users/profile` - Update user profile

### File Management

- `POST /api/v1/files/upload` - Upload a file
- `GET /api/v1/files` - List all files
- `GET /api/v1/files/:id` - Get file details
- `DELETE /api/v1/files/:id` - Delete a file

### AI Operations

- `POST /api/v1/ai/chat` - Send a chat message
- `POST /api/v1/ai/generate` - Generate content
- `GET /api/v1/ai/history` - Get AI interaction history

## Rate Limiting

API requests are limited to 100 requests per 15 minutes per IP address.

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## Need Help?

Refer to the [API Reference](../api-reference/) for detailed endpoint documentation.
