# File Storage Guide

This guide explains how to manage file uploads and storage in the MagicAI server.

## Supported File Types

The server supports the following file types:

- **Documents**: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX
- **Text**: TXT, MD, CSV
- **Images**: JPG, JPEG, PNG, GIF, SVG
- **Archives**: ZIP, RAR (for bulk operations)

## File Size Limits

- Default maximum file size: **10MB**
- This can be configured in the `.env` file using `MAX_FILE_SIZE`

## Upload Process

### 1. Single File Upload

```javascript
POST /api/v1/files/upload
Content-Type: multipart/form-data

{
  file: [binary data],
  description: "Optional description"
}
```

### 2. Multiple File Upload

```javascript
POST /api/v1/files/upload-multiple
Content-Type: multipart/form-data

{
  files: [binary data array]
}
```

## Storage Structure

Uploaded files are organized as follows:

```
uploads/
├── documents/
│   ├── 2024/
│   │   ├── 01/
│   │   │   └── user-123-file.pdf
├── images/
│   ├── 2024/
│   │   ├── 01/
│   │   │   └── user-123-image.jpg
└── temp/
    └── processing-xyz.tmp
```

## File Processing

1. **Upload**: File is received and validated
2. **Virus Scan**: Optional virus scanning (configure in settings)
3. **Storage**: File is saved to appropriate directory
4. **Database**: Metadata is stored in the database
5. **Response**: File ID and URL are returned

## Security Considerations

- All uploaded files are validated for type and size
- File names are sanitized to prevent directory traversal
- Virus scanning recommended for production environments
- Consider implementing file encryption for sensitive data

## Cleanup

Temporary files in the `temp/` directory should be cleaned regularly:

```bash
# Clean files older than 24 hours
find uploads/temp -type f -mtime +1 -delete
```

## Best Practices

1. Always validate file types on the server-side
2. Implement file size limits appropriate for your use case
3. Use unique file names to prevent collisions
4. Backup uploaded files regularly
5. Monitor disk space usage
6. Implement access controls for file retrieval

## Configuration

Edit `.env` to customize file upload settings:

```env
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=pdf,doc,docx,xls,xlsx,ppt,pptx,txt,md
```

## Troubleshooting

### Upload Fails

- Check file size doesn't exceed limit
- Verify file type is allowed
- Ensure uploads directory has write permissions

### Slow Uploads

- Check network bandwidth
- Consider increasing timeout settings
- Implement chunked uploads for large files

## Need More Help?

Contact support or open an issue in the repository.
