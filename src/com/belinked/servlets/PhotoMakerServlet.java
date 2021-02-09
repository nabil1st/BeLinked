package com.belinked.servlets;

import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.StringTokenizer;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;


import org.apache.catalina.core.ApplicationPart;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;
import org.apache.tomcat.util.http.fileupload.FileItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Repository;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import com.belinked.dto.PeopleMap;
import com.belinked.dto.PersonDTO;
import com.belinked.dto.RelationshipDTO;
import com.belinked.dto.TreeLeaf;
import com.belinked.model.Person;
import com.belinked.repository.PersonRepository;
import com.belinked.services.PersonService;
import com.belinked.services.RepositoryPersonService;
import com.belinked.util.DateUtils;

/**
 * Servlet implementation class PhotoMakerServlet
 */
@Configurable(dependencyCheck=true)
@MultipartConfig
@WebServlet(description = "PhotoMakerServlet", urlPatterns = { "/PhotoMakerServlet" })
public class PhotoMakerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	@Autowired
	private RepositoryPersonService personService;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PhotoMakerServlet() {
        super();
        // TODO Auto-generated constructor stub
    }
    
    public void init(ServletConfig config) {
        try {
			super.init(config);
		} catch (ServletException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        SpringBeanAutowiringSupport.processInjectionBasedOnServletContext(this,
          config.getServletContext());
      }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String urlImage = request.getParameter("imageid");
		//URL url;
	    InputStream is = null;
	    try {
	    	response.setContentType("image/jpg");
	    	
	    	is = new FileInputStream("C:/Temp/HTMLTree/" + urlImage);
			//url = new URL(urlImage);
	        //is = url.openStream(); 
	        //InputStreamReader br = new InputStreamReader(is);
	        ServletOutputStream out = response.getOutputStream();
	        //BufferedImage bgImage = readImage("C:/Temp/HTMLTree/framed.png");
	        //out.write(IOUtils.toByteArray()
	        IOUtils.copy(is,out);
	        out.flush();
	        out.close();
	    } catch (MalformedURLException mue) {
	         mue.printStackTrace();
	    } catch (IOException ioe) {
	         ioe.printStackTrace();
	    } finally {
	        try {
	            if (is != null) is.close();
	        } catch (IOException ioe) {
	        }
	    }
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		/*Part file = request.getPart("file");		
        String filename = getFilename(file);
        InputStream filecontent = file.getInputStream();
		BufferedImage bImageFromConvert = ImageIO.read(filecontent);
		 
		String x = request.getParameter("x");
		String y = request.getParameter("y");
		String widthStr = request.getParameter("width");
		String heightStr = request.getParameter("height");
		
		BufferedImage croppedImage = bImageFromConvert.getSubimage(
				Integer.parseInt(x), Integer.parseInt(y), Integer.parseInt(widthStr), Integer.parseInt(heightStr));
		 
		String fileName = request.getRealPath("") + "\\test.jpg";
		
		System.out.println(request.getServletPath());
		//System.out.println(request.getS)
		File f = new File(fileName);
				
	    try {
	    	
	    	ImageIO.write(croppedImage, "jpg", f);
	    	//response.setContentType("application/vnd.ms-excel");	
		    //response.setHeader("Content-Disposition", 
		    //		 "attachment; filename=sampleName.xls");		    
		     
		} catch (Exception e) {
		     throw new ServletException("Exception in Excel Sample Servlet", e);
		} finally {		     
		}
		    
		response.getOutputStream().write("http://localhost:8080/PDFParserService/test.xls".getBytes());
		response.getOutputStream().flush();
		response.getOutputStream().close();*/
		
		//String imageData = request.getParameter("imageData");
		//System.out.println(imageData);
		
		
		Enumeration<String> en = request.getParameterNames();
		
		PersonDTO personDTO = new PersonDTO();
						
		long selectedPersonId = 0;
		
		String sendEnvite = "";
		String relationshipDetail = "";
		String confirms = "";
		boolean newMember = false;
		        
		while (en.hasMoreElements()) {			
	        String paramName = (String) en.nextElement();
	        String paramValue = request.getParameter(paramName);
	        
	        //out.println(paramName + " = " + request.getParameter(paramName) + "<br/>");
	        if (paramName.equals("email")) {
	        	personDTO.setEmail(paramValue);
	        } else if (paramName.equals("fName")) {
	        	personDTO.setfName(paramValue);
	        } else if (paramName.equals("lName")) {
	        	personDTO.setlName(paramValue);
	        } else if (paramName.equals("dob")) {
	        	personDTO.setDob(DateUtils.toDate(paramValue));				
	        } else if (paramName.equals("relationship")) {
	        	relationshipDetail = paramValue;	        	
	        } else if (paramName.equals("sex")) {
	        	personDTO.setSex(paramValue);
	        } else if (paramName.equals("isAccount")) {
	        	personDTO.setIsAccount(paramValue.equals("true")?1:0);
	        } else if (paramName.equals("sendEnvite")) {
	        	sendEnvite = paramValue;
	        } else if (paramName.equals("selectedPersonId")) {
	        	selectedPersonId = new Long(paramValue).longValue();
	        } else if (paramName.equals("confirms")) {
	        	confirms = paramValue;
	        } else if (paramName.equals("newMember")) {
	        	newMember = Boolean.parseBoolean(paramValue);
	        	personDTO.setIsAccount(1);
	        } 
		}		
		
		
		//personDTO.setSource(imageSource);
		
		Person created = personService.create(personDTO);
		PersonDTO createdDTO = new PersonDTO(created);
		String imageSource = createdDTO.getSource();
		PeopleMap.getInstance().addPerson(createdDTO);
		
		if (!newMember) {
			PeopleMap.getInstance().addRelatedPersonByRelationshipDetail(personDTO, selectedPersonId, relationshipDetail);
			// Process confirms
			if (confirms.length() > 0) {
				StringTokenizer st = new StringTokenizer(confirms, ",");
				while (st.hasMoreTokens()) {
					String confirm = st.nextToken();
					StringTokenizer stt = new StringTokenizer(confirm, "_");				
					String confirmRelationship = stt.nextToken();
					Long confirmId = new Long(stt.nextToken());
					
					// Create a relationship between the confirm and the new person
					PeopleMap.getInstance().createRelationship(selectedPersonId, confirmId, personDTO, 
							relationshipDetail, confirmRelationship);
					
				}
			}
		}
		
		
		
				
		byte[] bytes = toByteArrayUsingJava(request.getInputStream());
		String str = new String(bytes);
		byte[] buffer = Base64.decodeBase64(str.substring(22));   
		
		
		try {
			BufferedImage fgImage = ImageIO.read(new ByteArrayInputStream(buffer));  
			//File imgOutFile = new File("newLabel.png");  
			//ImageIO.write(bufImg, "png", imgOutFile);
			
			BufferedImage bgImage = readImage("C:/Temp/HTMLTree/frame3.jpg");
			
			BufferedImage framedImage = overlayImages(bgImage, fgImage, 15, 15);
			
			writeImage(framedImage, "C:/Temp/HTMLTree/" + imageSource, "PNG");
			
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		
		response.getOutputStream().write(created.getId().toString().getBytes());		 
			
	}
	
	private static String getFilename(Part part) {
        for (String cd : part.getHeader("content-disposition").split(";")) {
            if (cd.trim().startsWith("filename")) {
                String filename = cd.substring(cd.indexOf('=') + 1).trim().replace("\"", "");
                return filename.substring(filename.lastIndexOf('/') + 1).substring(filename.lastIndexOf('\\') + 1); // MSIE fix.
            }
        }
        return null;
    }
	
	public static byte[] toByteArrayUsingJava(InputStream is) throws IOException{ 
		ByteArrayOutputStream baos = new ByteArrayOutputStream(); 
		int reads = is.read(); 
		while(reads != -1) { 
			baos.write(reads); 
			reads = is.read(); 
		} 
		
		return baos.toByteArray(); 
	}
	
	/**
     * This method reads an image from the file
     * @param fileLocation -- > eg. "C:/testImage.jpg"
     * @return BufferedImage of the file read
     */
    public static BufferedImage readImage(String fileLocation) {
        BufferedImage img = null;
        try {
            img = ImageIO.read(new File(fileLocation));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return img;
    }
    
    /**
     * Method to overlay Images
     *
     * @param bgImage --> The background Image
     * @param fgImage --> The foreground Image
     * @return --> overlayed image (fgImage over bgImage)
     */
    public static BufferedImage overlayImages(BufferedImage bgImage,
            BufferedImage fgImage, int fgx, int fgy) {
 
        /**Create a Graphics  from the background image**/
        Graphics2D g = bgImage.createGraphics();
        /**Set Antialias Rendering**/
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING,
                RenderingHints.VALUE_ANTIALIAS_ON);
        /**
         * Draw background image at location (0,0)
         * You can change the (x,y) value as required
         */
        g.drawImage(bgImage, 0, 0, null);
 
        /**
         * Draw foreground image at location (0,0)
         * Change (x,y) value as required.
         */
        g.drawImage(fgImage, fgx, fgy, null);
 
        g.dispose();
        return bgImage;
    }
    
    /**
     * This method writes a buffered image to a file
     * @param img -- > BufferedImage
     * @param fileLocation --> e.g. "C:/testImage.jpg"
     * @param extension --> e.g. "jpg","gif","png"
     */
    public static void writeImage(BufferedImage img, String fileLocation,
            String extension) {
        try {
            BufferedImage bi = img;
            File outputfile = new File(fileLocation);
            ImageIO.write(bi, extension, outputfile);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

	

}
