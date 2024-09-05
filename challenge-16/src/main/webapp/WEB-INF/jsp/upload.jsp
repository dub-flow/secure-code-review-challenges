<%@ page import="java.io.*, javax.servlet.*, javax.servlet.http.*" %>
<!DOCTYPE html>
<html>
<head>
    <title>File Upload</title>
</head>
<body>

<h2>File Upload</h2>

<% 
    // Handle file upload
    String message = null;
    if ("POST".equalsIgnoreCase(request.getMethod())) {
        try {
            Part filePart = request.getPart("file"); // Retrieves <input type="file" name="file">
            String fileName = filePart.getSubmittedFileName();
            String uploadPath = getServletContext().getRealPath("") + File.separator + "uploads";
            
            // Create uploads directory if it does not exist
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }
            
            // Write file to uploads directory
            filePart.write(uploadPath + File.separator + fileName);
            
            message = "File uploaded successfully!";
        } catch (Exception e) {
            message = "File upload failed: " + e.getMessage();
        }
    }
%>

<!-- Display file upload form -->
<form action="upload.jsp" method="post" enctype="multipart/form-data">
    <label for="file">Select file to upload:</label>
    <input type="file" name="file" />
    <input type="submit" value="Upload" />
</form>

<!-- Display result message -->
<% if (message != null) { %>
    <p><%= message %></p>
<% } %>

</body>
</html>
