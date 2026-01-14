# Configuration Directory

This directory contains configuration files for the MagicAI server.

## Purpose

Store configuration files for:
- Database connections
- API keys and credentials (use environment variables!)
- Application settings
- Feature toggles
- Third-party service configurations

## Security Best Practices

- **NEVER** commit sensitive credentials to version control
- Use environment variables for secrets
- Keep a `.env.example` file with dummy values
- Use different configs for development, staging, and production
- Implement config validation on startup

## Example Files

- `database.js` - Database connection settings
- `app.js` - Application configuration
- `api-keys.example.js` - Example API key structure
- `.env.example` - Example environment variables
