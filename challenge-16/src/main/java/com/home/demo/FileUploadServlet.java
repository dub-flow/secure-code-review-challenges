package com.home.demo;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

@WebServlet("/upload")
@MultipartConfig
public class FileUploadServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Part filePart = request.getPart("file");
        String fileName = filePart.getSubmittedFileName();
 
        if (fileName.toLowerCase().endsWith(".jsp")) {
            response.setContentType("text/html");
            PrintWriter out = response.getWriter();
            out.println("<html><body>");
            out.println("<h2>Error: .jsp files are not allowed!</h2>");
            out.println("<p><a href=\"/\">Go back</a></p>");
            out.println("</body></html>");
            return;
        }

        String uploadDir = getServletContext().getRealPath("") + File.separator + "uploads";
        File uploadDirFile = new File(uploadDir);
        if (!uploadDirFile.exists()) {
            uploadDirFile.mkdir();
        }
        
        File file = new File(uploadDir, fileName);
        try (InputStream fileContent = filePart.getInputStream();
             FileOutputStream outputStream = new FileOutputStream(file)) {
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = fileContent.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
        }
        
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h2>File Uploaded Successfully</h2>");
        out.println("<p>File Name: " + fileName + "</p>");
        out.println("<p><a href=\"/\">Go back</a></p>");
        out.println("</body></html>");
    }
}
