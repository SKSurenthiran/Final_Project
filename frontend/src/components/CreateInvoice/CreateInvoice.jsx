import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './CreateInvoice.css';

function CreateInvoice() {
    const [invoice, setInvoice] = useState({
        appointment_id: '',
        invoice_date: '',
        total_amount: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvoice({ ...invoice, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/invoices/create', invoice);
            console.log(response.data);
            setInvoice({ appointment_id: '', invoice_date: '', total_amount: '' });
            alert('Invoice created successfully');
            generatePDF(response.data);
        } catch (error) {
            console.error('Error creating invoice:', error);
            alert('Error creating invoice');
        }
    };

    const generatePDF = (invoiceData) => {
        const doc = new jsPDF();
        doc.text('Invoice', 20, 10);
        doc.autoTable({
            head: [['Field', 'Value']],
            body: [
                ['Appointment ID', invoiceData.appointment_id],
                ['Invoice Date', invoiceData.invoice_date],
                ['Total Amount', invoiceData.total_amount]
            ],
        });
        doc.save('invoice.pdf');
    };

    const handlePrint = () => {
        const doc = new jsPDF();
        doc.text('Invoice', 20, 10);
        doc.autoTable({
            head: [['Field', 'Value']],
            body: [
                ['Appointment ID', invoice.appointment_id],
                ['Invoice Date', invoice.invoice_date],
                ['Total Amount', invoice.total_amount]
            ],
        });
        window.open(doc.output('bloburl'), '_blank');
    };

    return (
        <div className="create-invoice">
            <h2>Create Invoice</h2>
            <form onSubmit={handleSubmit} className="invoice-form">
                <div className="form-group">
                    <label>Appointment ID:</label>
                    <input
                        type="text"
                        name="appointment_id"
                        value={invoice.appointment_id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Invoice Date:</label>
                    <input
                        type="date"
                        name="invoice_date"
                        value={invoice.invoice_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Total Amount:</label>
                    <input
                        type="number"
                        name="total_amount"
                        value={invoice.total_amount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Create Invoice</button>
            </form>
            <div className="invoice-actions">
                <button onClick={handlePrint}>Print Invoice</button>
            </div>
        </div>
    );
}

export default CreateInvoice;
