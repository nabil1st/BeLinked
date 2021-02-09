package com.belinked.security;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandlerImpl;

public class MyAccessDeniedHandlerImpl extends AccessDeniedHandlerImpl {
    @Override
    public void handle(HttpServletRequest req,
            HttpServletResponse resp, AccessDeniedException reason) throws ServletException,
            IOException {
        boolean isAjax = "XMLHttpRequest".equals(req.getHeader("X-Requested-With"));
         
        if (isAjax) {          
            String jsonObject = "{\"message\":\"You are not privileged to request this resource.\","+
                    "\"access-denied\":true,\"cause\":\"AUTHORIZATION_FAILURE\"}";
            String contentType = "application/json";
            resp.setContentType(contentType);
            PrintWriter out = resp.getWriter();
            out.print(jsonObject);
            out.flush();
            out.close();
            return;
        }
         
     super.handle(req, resp, reason);
    }
}

