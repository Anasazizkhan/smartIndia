import React, { useState, useEffect } from "react";
import axios from "axios";
import styled, { createGlobalStyle } from "styled-components";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import robotImage from "./assets/robot3.jpeg";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body, html {
    width: 100%;
    height: 100%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
`;

const Register = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  const [formData, setFormData] = useState({
    teamName: "",
    teamMembers: "",
    leaderName: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        formData
      );

      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000, // Closes after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });

      console.log(response.data);
    } catch (error) {
      toast.error("Registration Failed!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });

      console.error(error);
    }
  };

  return (
    <>
      <GlobalStyle />
      <StyledContainer>
        <LeftSection data-aos="fade-right">
          <SocialIcons>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF data-aos="flip-left" data-aos-delay="200" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter data-aos="flip-left" data-aos-delay="400" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram data-aos="flip-left" data-aos-delay="600" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn data-aos="flip-left" data-aos-delay="800" />
            </a>
          </SocialIcons>
          <WelcomeContainer>
            <WelcomeText data-aos="zoom-in">SMART INDIA HACKATHON</WelcomeText>
            <SubText data-aos="fade-up">
              Join the Innovation Journey at Noida this time!
            </SubText>
          </WelcomeContainer>
          <Address>Sector 62, Noida, Uttar Pradesh, India</Address>
        </LeftSection>
        <RightSection data-aos="fade-left">
          <FormContainer data-aos="zoom-in-up">
            <FormHeading>TEAM REGISTRATION</FormHeading>
            <ToastContainer />
            <StyledForm onSubmit={handleSubmit}>
              <StyledInput
                type="text"
                name="teamName"
                placeholder="Team Name"
                onChange={handleChange}
                required
                data-aos="fade-up"
              />
              <StyledInput
                type="number"
                name="teamMembers"
                placeholder="Team Members"
                onChange={handleChange}
                required
                data-aos="fade-up"
                data-aos-delay="200"
              />
              <StyledInput
                type="text"
                name="leaderName"
                placeholder="Leader Name"
                onChange={handleChange}
                required
                data-aos="fade-up"
                data-aos-delay="400"
              />
              <StyledInput
                type="tel"
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                required
                data-aos="fade-up"
                data-aos-delay="600"
              />
              <StyledInput
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
                data-aos="fade-up"
                data-aos-delay="800"
              />
              <StyledButton
                type="submit"
                data-aos="flip-up"
                data-aos-delay="1000"
              >
                Register Team
              </StyledButton>
            </StyledForm>
          </FormContainer>
        </RightSection>
      </StyledContainer>
    </>
  );
};

const StyledContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${robotImage}) no-repeat center center/cover;
  color: white;
  height: 100vh;
  padding-top: 1rem;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  a {
    color: white;
    font-size: 1.5rem;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

const WelcomeText = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const SubText = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #ddd;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: radial-gradient(
    circle at center,
    #ffffff,
    #dde1e7,
    #aab2c8
  ); // Whitish cosmic tones
`;

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.div`
  width: 90%;
  max-width: 450px;
  padding: 2.5rem;
  border-radius: 1.5rem; // Slightly more rounded corners
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15); // Enhanced shadow
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.1)
  ); // Gradient background
  backdrop-filter: blur(12px); // Increased blur
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4); // Stronger border
  transition: box-shadow 0.3s ease, transform 0.3s ease; // Added transition

  &:hover {
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2); // Hover effect
    transform: translateY(-5px); // Slight lift on hover
  }
`;

const FormHeading = styled.h2`
  font-size: 2.2rem;
  font-weight: 600;
  text-align: center;
  color: #333;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const StyledInput = styled.input`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;
const Address = styled.p`
  font-size: 1rem;
  text-align: center;
  color: #ddd;
  position: absolute;
  bottom: 1rem;
  width: 100%;
`;

const StyledButton = styled.button`
  background-color: rgb(0, 18, 38);
  color: white;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.99);
  }
`;

export default Register;
