import React, { useEffect, useState } from "react";
import OrderService from '../../adapters/orderService';
import {
    Button,
    Typography,
} from "@material-ui/core";
import AcceptOrderModal from "./AcceptOrderModal";
import { DataGrid } from '@material-ui/data-grid';

const AvailableOrders = ({ driver_id, setAcceptedOrder }) => {

    const [availableOrders, setAvailableOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [showAcceptOrderModal, setShowAcceptOrderModal] = useState(false);
    const hideAcceptOrderModal = () => setShowAcceptOrderModal(false);


    useEffect(() => {
        OrderService.getAvailableOrders().then(res => {
            setAvailableOrders(res.data);
        })
    }, [])

    const rows = availableOrders.map((order, index) => 
     { return {id: index, time: Math.floor(Math.random() * 120) + 1, pay: Math.floor(Math.random() * 50) + 1, deliver: order.deliveryTime, order: order } }
    );

    const columns = [
        { 
            field: 'id', 
            hide: true
        },
        {
            field: 'time',
            headerName: 'Time To Deliver',
            width: 185,
            editable: false,
            disableColumnFilter: true,
            disableColumnMenu:true,
            disableColumnSelector: true,
            disableSelectionOnClick: true,
            valueFormatter: (params) => {
                return `${params.value} minutes`;
              },
        },
        {
            field: 'pay',
            headerName: 'Pay',
            width: 102,
            editable: false,
            disableColumnFilter: true,
            disableColumnMenu:true,
            disableColumnSelector: true,
            disableSelectionOnClick: true,
            valueFormatter: (params) => {
                return `${params.value} $`;
              },
        },
        {
            field: 'deliver',
            headerName: 'Delivery Slot',
            width: 180,
            editable: false,
            disableColumnFilter: true,
            disableColumnMenu:true,
            disableColumnSelector: true,
            disableSelectionOnClick: true,
            valueFormatter: (params) => {
                const valueFormatted = params.value.split('T')[1].split('.')[0]
                return `${valueFormatted} `;
              },
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 95,
            disableClickEventBubbling: true,
            disableColumnSelector: true,
            disableColumnFilter: true,
            disableColumnMenu: true,
            sortable: false,
            disableSelectionOnClick: true,
            renderCell: (params) => {
                return  <Button size="small" color="primary" variant="contained" onClick= {()=> { setSelectedOrder(params.row.order); setShowAcceptOrderModal(true)}}>View</Button>;
            }
            
        },
        {
            field: 'order',
            hide: true
        }
    ];

    return (
        <React.Fragment>
            <AcceptOrderModal show={showAcceptOrderModal} onHide={hideAcceptOrderModal} order={selectedOrder} driver_id={driver_id} setAcceptedOrder={setAcceptedOrder}></AcceptOrderModal>
            <Typography component="h1" variant="h6" color="inherit" >
                Available Orders:
            </Typography>
            <br/>
            <div style={{ height: 595, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={9}
                    
                />
            </div>

        </React.Fragment>
    );
}
export default AvailableOrders;