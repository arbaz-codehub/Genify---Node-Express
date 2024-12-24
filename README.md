# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Backend API Documentation

The backend server provides a robust file generation and download API endpoint built with Express.js.

### POST /generate

This endpoint handles the generation of text files from JSON data and facilitates automatic file downloads.

#### Endpoint Details
- **URL**: `/generate`
- **Method**: `POST`
- **Port**: 5300 (default)

#### Query Parameters
- `filename` (optional)
  - Name of the output file
  - If not provided, defaults to "hello.txt"
  - Example: `/generate?filename=myfile.txt`

#### Request Body
- Must be valid JSON data
- Will be converted to string format
- Example:
  ```json
  {
    "key": "value",
    "message": "Hello World"
  }
  ```

#### Required Headers
- `Content-Type: application/json`

#### Response Details
- **Content-Type**: text/plain
- **Content-Disposition**: attachment; filename=[specified filename]
- Downloads automatically in browser
- File is temporarily created and automatically deleted after download

#### Error Handling
- 500 Internal Server Error
  - Returned if file creation/reading fails
  - Returns JSON with error message

#### Usage Examples

1. **Local Development**

