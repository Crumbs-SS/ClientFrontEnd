import React, { useEffect, useState } from "react";
import OrderService from '../../adapters/orderService';
import {
    Button,
    Typography,
} from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';

const RecentOrders = ({ id, rerender }) => {

    const [availableOrders, setAvailableOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [showAcceptOrderModal, setShowAcceptOrderModal] = useState(false);
    const hideAcceptOrderModal = () => setShowAcceptOrderModal(false);

    useEffect(() => {
        OrderService.getAvailableOrders().then(res => {
            setAvailableOrders(res.data);
        })
    }, [])

    const rows = availableOrders.map((order, index) => { return { id: index, time: order.deliveryTime, pay: order.deliveryPay, deliver: order.deliverySlot, order: order } }
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
            disableColumnMenu: true,
            disableColumnSelector: true,
            disableSelectionOnClick: true,
            valueFormatter: (params) => {
                return `${params.value}`;
            },
        },
        {
            field: 'pay',
            headerName: 'Pay',
            width: 102,
            editable: false,
            disableColumnFilter: true,
            disableColumnMenu: true,
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
            disableColumnMenu: true,
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
                return <Button size="small" color="primary" variant="contained" onClick={() => { setSelectedOrder(params.row.order); setShowAcceptOrderModal(true) }}>View</Button>;
            }

        },
        {
            field: 'order',
            hide: true
        }
    ];

    if (availableOrders.length === 0) {
        return (
            <React.Fragment>
                <br />
                <Typography component="h1" variant="h6" color="inherit" style={{ fontWeight: 600 }}>
                    No Available Orders at this time! We will notify you once an order is available.
                </Typography>
            </React.Fragment>
        )
    }
    else {
        return (
            <React.Fragment>
                
                <Typography component="h1" variant="h6" color="inherit" >
                    Available Orders:
                </Typography>
                <br />
                <div style={{ height: 595, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={9}
                        rowsPerPageOptions={[9]}

                    />
                </div>
            </React.Fragment>
        );
    }
}
export default RecentOrders;
