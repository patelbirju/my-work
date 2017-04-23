/**
 *  File name: BPutil.js
    Author: Birju Patel
    Date: 12/03/2017
 */

function doValidation_BPAddForm (){
    var form = $("#BPAddForm");

    form.validate({
        rules:{
            BPBusinessName:{
                required: true,
                rangelength: [2,20]
            },
            BPEmail:{
                required: true,
                email: true
            },
            BPReviewDate:{
                required: true
            },
            BPFoodQuality:{
                ratingcheck: true
            },
            BPService:{
                ratingcheck: true
            },
            BPValue:{
                ratingcheck: true
            }
        },
        messages:{
            BPBusinessName:{
                required: "Business name is required",
                rangelength: "Length must be 2-20 characters"
            },
            BPEmail:{
                required: "Email is required",
                email: "Please enter a valid email address"
            },
            BPReviewDate:{
                required: "Review date is required"
            },
            BPFoodQuality:{
                ratingcheck: "Value must be between 0-5"
            },
            BPService:{
                ratingcheck: "Value must be between 0-5"
            },
            BPValue:{
                ratingcheck: "Value must be between 0-5"
            }
        }
    });
    return form.valid();
}

function doValidation_BPEditForm() {
    var form = $("#BPEditForm");

    form.validate({
        rules:{
            BPEditBusinessName:{
                required: true,
                rangelength: [2,20]
            },
            BPEditEmail:{
                required: true,
                email: true
            },
            BPEditReviewDate:{
                required: true
            },
            BPEditFoodQuality:{
                ratingcheck: true
            },
            BPEditService:{
                ratingcheck: true
            },
            BPEditValue:{
                ratingcheck: true
            }
        },
        messages:{
            BPEditBusinessName:{
                required: "Business name is required",
                rangelength: "Length must be 2-20 characters"
            },
            BPEditEmail:{
                required: "Email is required",
                email: "Please enter a valid email address"
            },
            BPEditReviewDate:{
                required: "Review date is required"
            },
            BPEditFoodQuality:{
                ratingcheck: "Value must be between 0-5"
            },
            BPEditService:{
                ratingcheck: "Value must be between 0-5"
            },
            BPEditValue:{
                ratingcheck: "Value must be between 0-5"
            }
        }
    });
    return form.valid();
}

//jQuery validator for checking the rating text boxes
jQuery.validator.addMethod("ratingcheck",
    function (value, element) {
        if (value < 0 || value > 5)
        {
            return false;
        }
        return true;
    },
    "Value must be between 0-5"
);