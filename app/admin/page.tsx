"use client"

import { FC, useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { Home, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Service {
    id: string;
    Title: string;
    Description: string;
}

const AdminPage: FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [newService, setNewService] = useState({ Title: '', Description: '' });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        const response = await fetch('/api/services');
        const data = await response.json();
        setServices(data);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewService({ ...newService, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify([{
                    fields: {
                        Title: newService.Title,
                        Description: newService.Description
                    }
                }])
            });

            if (response.ok) {
                setNewService({ Title: '', Description: '' });
                fetchServices();
            } else {
                const errorData = await response.json();
                alert(`Error adding service: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding service. Please try again.');
        }
    };

    const handleDelete = async (id: string) => {
        console.log(id);
        try {
            const response = await fetch(`/api/services`, {
                method: 'DELETE',
                body: JSON.stringify(id), // Airtable requires an array of record IDs to delete
            });

            if (response.ok) {
                fetchServices();
            } else {
                const errorData = await response.json();
                alert(`Error deleting service: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error deleting service. Please try again.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 space-y-4">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <Link href="/">
                <Home className="h-8 w-8" />
            </Link>
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Add New Service</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="Title" className="block mb-2">Title</label>
                        <Input
                            type="text"
                            id="Title"
                            name="Title"
                            value={newService.Title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="Description" className="block mb-2">Description</label>
                        <Textarea
                            id="Description"
                            name="Description"
                            value={newService.Description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <Button type="submit">Add Service</Button>
                </form>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-4">Existing Services</h2>
                <ul className="space-y-4">
                    {services.map((service) => (
                        <li key={service.id} className="border p-4 rounded flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-semibold">{service.Title}</h3>
                                <p style={{ whiteSpace: 'pre-line' }}>{service.Description}</p>
                            </div>
                            <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => handleDelete(service.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default AdminPage