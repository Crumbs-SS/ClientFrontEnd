import React, { useEffect, useState } from "react";
import {
    Button,
    Typography,
    IconButton,
} from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import OrderModal from "./OrderModal";
import LoopIcon from '@material-ui/icons/Loop';
import OrderService from "../../adapters/orderService";


const RecentOrders = ({ username }) => {
 
    const [orders, setPendingOrders] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [refresh, setRefresh] = useState(false);
    
    const [showAcceptOrderModal, setShowAcceptOrderModal] = useState(false);
    const hideAcceptOrderModal = () => setShowAcceptOrderModal(false);

  useEffect(() => {
    OrderService.getPendingOrders(username).then((response) => {
        setPendingOrders(response.data);
    })
}, [username, refresh])

   
    useEffect(() => {

    },[refresh])

    const columns = [
        {
            field: 'id',
            hide: true
        },
        {
            field: 'restaurant',
            headerName: 'Restaurant',
            width: 130,
            editable: false,
            disableColumnSelector: true,
            disableSelectionOnClick: true,
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 165,
            editable: false,
            disableColumnFilter: true,
            disableColumnMenu: true,
            disableColumnSelector: true,
            disableSelectionOnClick: true,
            valueFormatter: (params) => {
                return `${params.value.split('T')[0]} at ${params.value.split('T')[1].split('.')[0]}`;
            },
        },
        {
            field: 'amount',
            headerName: 'Amount',
            width: 111,
            editable: false,
            disableColumnFilter: true,
            disableColumnMenu: true,
            disableColumnSelector: true,
            disableSelectionOnClick: true,
            valueFormatter: (params) => {
                return `${params.value / 100} $`;
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 180,
            editable: false,
            disableColumnFilter: true,
            disableColumnMenu: true,
            disableColumnSelector: true,
            disableSelectionOnClick: true,
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

    if (orders) {
        return (
            <React.Fragment>
                <OrderModal show={showAcceptOrderModal} onHide={hideAcceptOrderModal} order={selectedOrder}></OrderModal>
                <span>
                    <Typography component="h1" variant="h6" color="inherit" >
                        Pending Orders: 
                        <IconButton onClick={() => {refresh === true ? setRefresh(false) : setRefresh(true)}}>
                            <LoopIcon></LoopIcon>
                        </IconButton>
                    </Typography>
                </span>


                <br />
                <div style={{ height: 595, width: '100%' }}>
                    <DataGrid
                        rows={
                            orders.map((order, index) => {
                                return {
                                    id: index,
                                    restaurant: order.restaurant.name,
                                    date: order.createdAt,
                                    amount: order.payment.amount,
                                    status: order.orderStatus.status,
                                    order: order
                                }
                            })}
                        columns={columns}
                        pageSize={9}
                        rowsPerPageOptions={[9]}
                    />
                </div>
            </React.Fragment>
        );
    }
    else {
        return null;
    }
}
export default RecentOrders;
