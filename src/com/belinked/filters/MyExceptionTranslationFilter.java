package com.belinked.filters;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.access.ExceptionTranslationFilter;

public class MyExceptionTranslationFilter extends ExceptionTranslationFilter {
    @Override
    protected void sendStartAuthentication(HttpServletRequest req,
            HttpServletResponse resp, FilterChain chain,
            AuthenticationException reason) throws ServletException,
            IOException {
        boolean isAjax = "XMLHttpRequest".equals(req.getHeader("X-Requested-With"));
         
        if (isAjax) {          
            String jsonObject = "{\"message\":\"Please login first.\","+
                    "\"access-denied\":true,\"cause\":\"AUTHENTICATION_FAILURE\"}";
            String contentType = "application/json";
            resp.setContentType(contentType);
            PrintWriter out = resp.getWriter();
            out.print(jsonObject);
            out.flush();
            out.close();
            return;
        }
         
        super.sendStartAuthentication(req, resp, chain, reason);
    }
}
