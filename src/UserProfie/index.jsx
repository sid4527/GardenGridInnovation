import "./index.scss"; // Import SCSS file

// Import icon images
import faEye from "../images/eye-close.png";
import faEyeSlash from "../images/eye-fill.png";
import DefaultAvatar from "../images/avatar.png";
import IconBack from "../images/icon-back.png";

// Import React and its hooks
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * UserProfile component for rendering and managing the user profile page.
 * Users can view and edit their username, password, email, and avatar.
 */
const UserProfile = () => {
  const navigate = useNavigate();

  // Initialize state variables to store user information
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    avatar: "",
  });

  // Store the preview of the avatar
  const [avatarPreview, setAvatarPreview] = useState(
    user.avatar || DefaultAvatar
  );

  // Control the type of the password input field (text or password)
  const [showPassword, setShowPassword] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle avatar upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setUser((prevUser) => ({
          ...prevUser,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      alert("Invalid email format");
      return;
    }

    // Confirm save action
    if (window.confirm("Are you sure you want to save the changes?")) {
      // Add code here to save user information to the server
      console.log("User Profile Updated:", user);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle back button click
  const handleBackClick = () => {
    navigate(-1);
  };

  // Render the user profile page
  return (
    <div className="profile">
      {/* Back button in the top-left corner */}
      <button className="back-button" onClick={handleBackClick}>
        <img src={IconBack} />
      </button>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* Avatar upload and display area */}
        <div className="avatar-container">
          <label htmlFor="avatar-upload" className="avatar-label">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="avatar-preview"
              />
            ) : (
              <span className="default-avatar">+</span>
            )}
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: "none" }}
          />
        </div>

        <ul className="container">
          <li className="list-item">
            <div className="label">User Name:</div>
            <div className="editor">
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
              />
            </div>
          </li>
          <li className="list-item">
            <div className="label">Password:</div>
            <div className="editor editor-password">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                <img src={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </li>
          <li className="list-item">
            <div className="label">Email:</div>
            <div className="editor">
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
          </li>
        </ul>
        <button type="submit" className="save-button">
          Save
        </button>
      </form>
    </div>
  );
};

// Export UserProfile component
export default UserProfile;
