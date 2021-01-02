const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name : 'blog2323',
  api_key : '831981192222142',
  api_secret : 'sFTOuDRuFXVJEeZbMKW4eWibTuI'
})

module.exports = cloudinary;
