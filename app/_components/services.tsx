"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useEffect, useState } from "react";

interface Service {
    ID: number;
    Title: string;
    Description: any;
}

export const Services = () => {

    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        // Simulating data fetch. Replace this with your actual data fetching logic
        const fetchServices = async () => {
            // This is a placeholder. Replace with your actual API call
            const response = await fetch('/api/services');
            const data: Service[] = await response.json();
            setServices(data);
        };

        fetchServices();
    }, []);

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-5">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                    🚀 AI-Powered Business Solutions
                </h2>
                {services.map((service: any) => (
                    <div key={service.ID} className="mb-10">
                        <h3 className="text-2xl font-bold mb-4">{service.Title}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
}
