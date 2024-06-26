import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export const Register = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cnic: "",
    role: false 
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      role: e.target.checked
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const requestData = {
      ...formData,
      role: formData.role ? 'admin' : 'user' 
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    };

    fetch('http://localhost:4000/users/signUp', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('POST request successful:', data);
      })
      .catch(error => {
        console.error('There was a problem with the POST request:', error);
      });

      if (validateForm()) {
        setFormData({
          name: "",
          email: "",
          password: "",
          cnic: "",
          role: false
        });
        toast.success("User registered successfully!", { autoClose: 2000 });
      } else {
        console.log("Form is invalid");
      }
  
  };

  const validateForm = () => {
        let errors = {};
        let formIsValid = true;
    
    
        if (!formData.name.trim()) {
          formIsValid = false;
          errors["name"] = "Full Name is required";
        }
    
    
        if (!formData.email.trim()) {
          formIsValid = false;
          errors["email"] = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          formIsValid = false;
          errors["email"] = "Invalid email address";
        }
    
    
        if (!formData.password.trim()) {
          formIsValid = false;
          errors["password"] = "Password is required";
        }
    
        if (!formData.cnic.trim()) {
          formIsValid = false;
          errors["cnic"] = "CNIC is required";
        } else if (!/^\d{5}-\d{7}-\d{1}$/.test(formData.cnic)) {
          formIsValid = false;
          errors["cnic"] =
            "Invalid CNIC format. Please use the format: 12345-1234567-1";
        }
    
        setErrors(errors);
        return formIsValid;
      };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create an account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
              />
              <span className="text-red-500">{errors["name"]}</span>
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              <span className="text-red-500">{errors["email"]}</span>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              <span className="text-red-500">{errors["password"]}</span>
            </div>
            <div>
              <label htmlFor="cnic" className="sr-only">
                CNIC
              </label>
              <input
                id="cnic"
                name="cnic"
                type="text"
                required
                value={formData.cnic}
                onChange={handleChange}
                pattern="[0-9]{5}-[0-9]{7}-[0-9]{1}"
                maxLength="15"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="CNIC (e.g., 1234512345671)"
              />
              <span className="text-red-500">{errors["cnic"]}</span>
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="role"
              name="role"
              type="checkbox"
              checked={formData.role}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="role" className="ml-2 block text-sm text-gray-900">
              Register as admin
            </label>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
        
        <div className="text-sm">
          <p className="text-center">Already have an account?{"  "} <Link to="/Login" className="font-medium text-blue-600 hover:text-blue-500">Login page</Link></p>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        style={{ marginTop: "4rem" }} 
      />
    </div>
  );
};
