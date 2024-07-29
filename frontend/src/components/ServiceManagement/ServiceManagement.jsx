import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ServiceManagement.css';

function ServiceManagement() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    service_name: '',
    description: '',
    price: '',
    image: null,
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setServiceForm({ ...serviceForm, image: files[0] });
    } else {
      setServiceForm({ ...serviceForm, [name]: value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('service_name', serviceForm.service_name);
    formData.append('description', serviceForm.description);
    formData.append('price', serviceForm.price);
    if (serviceForm.image) {
      formData.append('image', serviceForm.image);
    }

    try {
      if (selectedService) {
        // Edit service
        const response = await axios.put(`http://localhost:3000/api/services/${selectedService.service_id}`, formData);
        setServices(services.map(service => service.service_id === selectedService.service_id ? response.data : service));
      } else {
        // Add service
        const response = await axios.post('http://localhost:3000/api/services/create', formData);
        setServices([...services, response.data]);
      }
      setServiceForm({ service_name: '', description: '', price: '', image: null });
      setSelectedService(null);
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleEditService = (service) => {
    setSelectedService(service);
    setServiceForm({
      service_name: service.service_name,
      description: service.description,
      price: service.price,
      image: null,
    });
  };

  const handleDeleteService = async (serviceId) => {
    try {
      await axios.delete(`http://localhost:3000/api/services/${serviceId}`);
      setServices(services.filter(service => service.service_id !== serviceId));
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <div className="serviceManagement-page">
      <h2>Service Management</h2>
      <form className="service-form" onSubmit={handleFormSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="service_name"
          value={serviceForm.service_name}
          onChange={handleInputChange}
          placeholder="Service Name"
          required
        />
        <input
          type="text"
          name="description"
          value={serviceForm.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="price"
          value={serviceForm.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleInputChange}
          placeholder="Image"
          accept="image/*"
          required={!selectedService}
        />
        <button type="submit">{selectedService ? 'Update Service' : 'Add Service'}</button>
        {selectedService && <button type="button" onClick={() => { setSelectedService(null); setServiceForm({ service_name: '', description: '', price: '', image: null }); }}>Cancel</button>}
      </form>
      <div className="services-container">
        {services.map(service => (
          <div key={service.service_id} className="service-card">
            <img src={`http://localhost:3000${service.image_url}`} alt={service.service_name} className="service-image" />
            <h3>{service.service_name}</h3>
            <p>{service.description}</p>
            <p className="service-price">{service.price}</p>
            <div className="service-buttons">
              <button className="edit-service-button" onClick={() => handleEditService(service)}>Edit</button>
              <button className="delete-service-button" onClick={() => handleDeleteService(service.service_id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceManagement;
