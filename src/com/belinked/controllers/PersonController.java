package com.belinked.controllers;

import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.belinked.dto.TreeLeaf;

@Controller
@RequestMapping("/person")
public class PersonController {
	
	@RequestMapping(value="/{image}", method = RequestMethod.GET)
	public @ResponseBody TreeLeaf savePerson(@PathVariable String imageString) {
		byte[] buffer = Base64.decodeBase64(imageString);           
  
		try {
			BufferedImage fgImage = ImageIO.read(new ByteArrayInputStream(buffer));  
			//File imgOutFile = new File("newLabel.png");  
			//ImageIO.write(bufImg, "png", imgOutFile);
			
			BufferedImage bgImage = readImage("C:/Temp/HTMLTree/frame3.jpg");
			
			BufferedImage framedImage = overlayImages(bgImage, fgImage, 15, 15);
			
			writeImage(framedImage, "C:/Temp/HTMLTree/framed.jpg", "JPG");
			
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		
		return new TreeLeaf(new Long(10),"images/Shredder.jpg", "Shredder", "sibling", "Brother", "m");
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
