var FORM_VALIDATOR = {};

FORM_VALIDATOR.NEW_RELATIVE_VALIDATOR = 
{
		setupFormValidation: function()
        {
			console.log("setup form validation");
            //form validation rules
            $("#newMemberForm").validate({
                rules: {
                    fName: "required",
                    lName: "required",
                    email: {
                        required: true,
                        email: true
                    },
                    dateOfBirth: {
                    	required: true,
                    	date: true
                    },
                    relationship: "required"
                },
                messages: {
                    fName: "Please enter the member's first name",
                    lName: "Please enter the member's last name",
                    email: "Please enter a valid email address",
                    dateOfBirth: "Please enter a valid Date of Birth",
                    relationship: "Please select a relationship"
                    	
                },
                submitHandler: function(form) {
                	console.log("submit form");
                	newRelativePage.savePictureAndClose();
                }
            });
        }	
}



FORM_VALIDATOR.NEW_MEMBER_VALIDATOR = 
{
		setupFormValidation: function()
        {
			console.log("setup form validation");
            //form validation rules
            $("#registrationForm").validate({
                rules: {
                    regFName: "required",
                    regLName: "required",
                    regEmail: {
                        required: true,
                        email: true
                    },
                    regDateOfBirth: {
                    	required: true,
                    	date: true
                    }                    
                },
                messages: {
                    fName: "Please enter the member's first name",
                    lName: "Please enter the member's last name",
                    email: "Please enter a valid email address",
                    dateOfBirth: "Please enter a valid Date of Birth"
                },
                submitHandler: function(form) {
                	console.log("submit registration form");
                	newMemberPage.savePictureAndClose();
                }
            });
        }	
}