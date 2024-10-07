import { Github, Linkedin, Mail, Phone } from "lucide-react";
import {
  FooterContainer,
  FooterContent,
  FooterSection,
  FooterTitle,
  FooterLink,
  FooterText,
  SocialLink,
  Copyright,
} from "../style/Footer.style";

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/">Products</FooterLink>
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Customer Service</FooterTitle>
          <FooterLink to="/faq">FAQ</FooterLink>
          <FooterLink to="/shipping">Shipping</FooterLink>
          <FooterLink to="/returns">Returns</FooterLink>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Contact Us</FooterTitle>
          <FooterText>P-234 Prestige Magnum </FooterText>
          <FooterText>
            <Phone size={16} style={{ marginRight: "0.5rem" }} />
            +91 90909090990
          </FooterText>
          <FooterText>
            <Mail size={16} style={{ marginRight: "0.5rem" }} />
            support@ecommerce.com
          </FooterText>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Follow Us</FooterTitle>
          <SocialLink
            href="https://github.com/addydist"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={20} style={{ marginRight: "0.5rem" }} />
          </SocialLink>
          <SocialLink
            href="https://www.linkedin.com/in/aditya-pal-85066520b/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={20} style={{ marginRight: "0.5rem" }} />
          </SocialLink>
        </FooterSection>
      </FooterContent>
      <Copyright>
        <FooterText>
          &copy; 2024 Your E-commerce Store. All rights reserved.
        </FooterText>
      </Copyright>
    </FooterContainer>
  );
}
