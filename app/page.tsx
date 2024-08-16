"use client"

import { FC } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { useEffect, useState } from "react";
import { motion, useTransform, useScroll } from 'framer-motion';
import styled from 'styled-components';

const Container = styled(motion.div)`
  align-items: center;
`;

interface Service {
  ID: number;
  Title: string;
  Description: string;
  ImageUrl: string
}

const LandingPage: FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const { scrollYProgress } = useScroll();
  const [isMounted, setIsMounted] = useState(false);

  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Subject: '',
    Budget: '',
    Message: ''
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch('/api/services');
      const data: Service[] = await response.json();
      setServices(data);
    };

    fetchServices();
  }, []);

  const scrollIntoView = (id: string) => {
    const contactSection = document.getElementById(id);
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, Budget: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Form submitted successfully!');
        setFormData({ Name: '', Email: '', Subject: '', Budget: '', Message: '' });
      } else {
        alert('Error submitting form. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ['#000000', '#ffffff', '#ffffff', '#000000']
  );

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ['#ffffff', '#000000', '#000000', '#ffffff']
  );

  if (!isMounted) return null;

  return (
    <Container className="to-white min-h-screen" style={{ backgroundColor }}>
      {/* Hero Section */}
      <motion.section className="py-20 px-5 h-screen flex items-center" style={{ backgroundColor }}>
        <motion.div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <motion.div className="md:w-1/2 mb-10 md:mb-0 space-y-6  max-width: 1400px;">
            <motion.h1 className="text-5xl font-extrabold mb-6" style={{ color: textColor }}>
              Revolutionize Your Business with AI Automation
            </motion.h1>
            <motion.p className="text-xl max-w-[550px]" style={{ color: textColor }}>
              Enhance productivity, streamline operations, and deliver exceptional customer experiences with our cutting-edge AI-powered solutions.
            </motion.p>
            <motion.div className="flex space-x-4">
              <Button variant="default" className='bg-white text-black hover:bg-rose-500 hover:text-black' onClick={() => scrollIntoView('services')}>View Services</Button>
              <Button variant="outline" className='bg-black text-white hover:bg-neutral-900 hover:text-white' onClick={() => scrollIntoView('contact')}>Contact Us</Button>
            </motion.div>
          </motion.div>
          <motion.div className="md:w-1/2">
            <Image
              src="/dashboard.jpg"
              alt="AI Dashboard"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Services Section */}
      <motion.section className="py-20" style={{ backgroundColor }} id="services">
        <motion.div className="container mx-auto px-4">
          <motion.h2 className="text-4xl font-bold text-center mb-12" style={{ color: textColor }}>
            🚀 AI-Powered Business Solutions
          </motion.h2>
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map((service) => (
              <Card key={service.ID} className="overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl" >
                <CardHeader className="p-6">
                  <motion.div className="w-16 h-16 mx-auto mb-4">
                    <img
                      src={service.ImageUrl}
                      alt={service.Title}
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                  <CardTitle className="text-xl font-semibold text-center" >
                    {service.Title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <motion.p className="text-sm font-medium leading-relaxed whitespace-pre-line" style={{ color: textColor }}>
                    {service.Description}
                  </motion.p>
                  {/* <Button variant="outline" className='bg-black text-white hover:bg-neutral-900 hover:text-white' onClick={() => scrollIntoView('contact')}>Contact Us</Button> */}
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Contact Form */}
      <motion.section className="py-20" style={{ backgroundColor }} id="contact">
        <motion.div className="container mx-auto px-5 max-w-2xl">
          <Card >
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Contact Us</CardTitle>
              <CardDescription className="text-center">Get in touch with our team for personalized solutions</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="Name">Name</Label>
                  <Input
                    id="Name"
                    value={formData.Name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="Email">Email</Label>
                  <Input
                    id="Email"
                    type="email"
                    value={formData.Email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="Subject">Subject</Label>
                  <Input
                    id="Subject"
                    value={formData.Subject}
                    onChange={handleChange}
                    placeholder="Enter your subject"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="Budget">Budget</Label>
                  <Select onValueChange={handleSelectChange} value={formData.Budget}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="less_than_100">Less than $100</SelectItem>
                      <SelectItem value="100_to_300">$100 - $300</SelectItem>
                      <SelectItem value="300_to_500">$300 - $500</SelectItem>
                      <SelectItem value="500_to_1k">$500 - $1,000</SelectItem>
                      <SelectItem value="1k_to_2k">$1,000 - $2,000</SelectItem>
                      <SelectItem value="2k_plus">$2,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="Message">Message</Label>
                  <Textarea
                    id="Message"
                    value={formData.Message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or questions"
                  />
                </div>
                <Button type="submit" className="w-full">Submit</Button>
              </motion.form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer className="bg-gray-900 text-white py-12" style={{ backgroundColor }}>
        <motion.div className=" mx-auto px-5">
          <motion.div className="text-center">
            <motion.p className="text-gray-400" style={{ color: textColor }}>&copy; All rights reserved.</motion.p>
          </motion.div>
        </motion.div>
      </motion.footer>
    </Container>
  )
}

export default LandingPage;
