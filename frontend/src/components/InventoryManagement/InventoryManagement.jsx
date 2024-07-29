import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './InventoryManagement.css'; // Add your CSS file for styling

function InventoryManagement() {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ item_name: '', quantity: '', price_per_unit: '' });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/inventory');
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory items:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleCreateItem = async () => {
    try {
      await axios.post('http://localhost:3000/api/inventory/create', newItem);
      setNewItem({ item_name: '', quantity: '', price_per_unit: '' });
      fetchInventory();
    } catch (error) {
      console.error('Error creating inventory item:', error);
    }
  };

  const handleDeleteItem = async (inventoryId) => {
    try {
      await axios.delete(`http://localhost:3000/api/inventory/${inventoryId}`);
      fetchInventory();
    } catch (error) {
      console.error('Error deleting inventory item:', error);
    }
  };

  return (
    <div className="inventory-management">
      <h2>Inventory Management</h2>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price per Unit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item.inventory_id}>
              <td>{item.item_name}</td>
              <td>{item.quantity}</td>
              <td>{item.price_per_unit}</td>
              <td>
                <button onClick={() => handleDeleteItem(item.inventory_id)} className='inventory-delete-btn'>Delete</button>
          
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Add New Inventory Item</h3>
      <form onSubmit={(e) => { e.preventDefault(); handleCreateItem(); }}>
        <input
          type="text"
          name="item_name"
          value={newItem.item_name}
          onChange={handleInputChange}
          placeholder="Item Name"
          required
        />
        <input
          type="number"
          name="quantity"
          value={newItem.quantity}
          onChange={handleInputChange}
          placeholder="Quantity"
          required
        />
        <input
          type="number"
          name="price_per_unit"
          value={newItem.price_per_unit}
          onChange={handleInputChange}
          placeholder="Price per Unit"
          required
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default InventoryManagement;
