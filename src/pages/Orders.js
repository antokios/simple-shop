import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spin, Space } from 'antd';
import DataTable from '../components/DataTable';
import ActionButtons from '../components/ActionButtons';
import ActionModal from '../components/ActionModal';

const columns = [
    {
        title: 'Order Number',
        dataIndex: 'key',
    },
    {
        title: 'Customer',
        dataIndex: 'name',
    },
    {
        title: 'Products',
        dataIndex: 'products',
    },
];

const Orders = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [orderData, setOrderData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalFormData, setModalFormData] = useState([]);
    const [modalType, setModalType] = useState(undefined);
    const [selectedOrderId, setSelectedOrderId] = useState(undefined);

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = () => {
        setIsLoading(true);
        const promise1 = axios.get('http://localhost:4000/customers/');
        const promise2 = axios.get('http://localhost:4000/products/');
        const promise3 = axios.get('http://localhost:4000/orders/');

        Promise.all([promise1, promise2, promise3]).then((results) => {
            const allCustomers = results[0]?.data;
            const allProducts = results[1]?.data;
            const allOrders = results[2]?.data;

            if (allOrders && allOrders?.length > 0) {
                let orders = [];

                for (let order of allOrders) {
                    const key = order._id;
                    const customerInOrder = allCustomers?.filter(customer => {
                        return customer._id === order.customerId;
                    })[0];
                    const name = `${customerInOrder.firstName} ${customerInOrder.lastName}`;

                    let products = '';
                    for (let product of order?.products) {
                        const productMatched = allProducts?.filter(productMatch => {
                            return productMatch._id === product.productId;
                        })[0];
                        products += `${product?.quantity} ${productMatched.name}, `
                    }

                    if (products.length > 0) {
                        products = products.slice(0, -2);
                    }

                    orders.push({
                        key,
                        name,
                        products
                    });
                }

                if (orders?.length > 0) {
                    setOrderData(orders);
                }
            }

            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
        });
    };

    const addOrder = () => {
        setModalType('Add New Order');
        setIsModalVisible(true);
    };

    const editOrder = () => {
        if (selectedOrderId) {
            setModalType('Edit Order');
            setIsModalVisible(true);
        }
    };

    const deleteOrder = () => {
        if (selectedOrderId) {
            setModalType('Delete Order');
            setIsModalVisible(true);
        }
    };

    const handleOk = () => {
        if (modalType) {
            if (modalType.includes('Add')) {
                console.log('Added Order!');
            } else if (modalType.includes('Edit')) {
                console.log('Edited Order!');
            } else if (modalType.includes('Delete')) {
                console.log('Deleted Order!');
            }
        }
        setIsModalVisible(false);
        setModalType(undefined);
        setModalFormData([]);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setModalType(undefined);
        setModalFormData([]);
    };

    const rowSelection = {
        onChange: (selectedRowKey, selectedRow) => {
            console.log(`selectedRowKeys: ${selectedRowKey}`, 'selectedRows: ', selectedRow);
            setSelectedOrderId(selectedRowKey);
        },
    };

    return (
        <div>
            {isLoading ?
                <Space size="middle">
                    <Spin size="large" />
                </Space>
                :
                <>
                    <ActionModal isVisible={isModalVisible} formData={modalFormData} modalTitle={modalType} okAction={handleOk} cancelAction={handleCancel} />
                    <DataTable data={orderData} columns={columns} rowSelection={rowSelection} />
                </>
            }
        </div>
    );
};

export default Orders;
