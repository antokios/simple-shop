import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spin, Space } from 'antd';
import DataTable from '../components/DataTable';
import ActionButtons from '../components/ActionButtons';
import ActionModal from '../components/ActionModal';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Price',
        dataIndex: 'price',
    },
    {
        title: 'Description',
        dataIndex: 'description',
    },
    {
        title: 'Image URL',
        dataIndex: 'imageUrl',
    },
    {
        title: 'Stock Quantity',
        dataIndex: 'stockQty',
    },
];

const Products = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [productData, setProductData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalFormData, setModalFormData] = useState([]);
    const [modalType, setModalType] = useState(undefined);
    const [selectedProductId, setSelectedProductId] = useState(undefined);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        setIsLoading(true);

        axios.get('http://localhost:4000/products/')
            .then((res) => {
                if (res.status === 200) {
                    const data = res?.data;

                    if (data?.length > 0) {
                        let productData = [];
                        for (let product of data) {
                            product.key = product._id;
                            productData.push(product);
                        }

                        setProductData(productData);
                    }
                }
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
            });
    };

    const addProduct = () => {
        setModalType('Add New Product');
        setModalFormData([
            {
                title: 'Name',
                value: 'Name',
            },
            {
                title: 'Price',
                value: 'Price'
            },
            {
                title: 'Description',
                value: 'Description'
            },
            {
                title: 'Image URL',
                value: 'Image URL'
            },
            {
                title: 'Stock Quantity',
                value: 'Stock Quantity'
            }
        ]);
        setIsModalVisible(true);
    };

    const editProduct = () => {
        if (selectedProductId) {
            setModalType('Edit Product');
            setModalFormData([
                {
                    title: 'Name',
                    value: '',
                },
                {
                    title: 'Price',
                    value: ''
                },
                {
                    title: 'Description',
                    value: ''
                },
                {
                    title: 'Image URL',
                    value: ''
                },
                {
                    title: 'Stock Quantity',
                    value: ''
                }
            ]);
            setIsModalVisible(true);
        }
    };

    const deleteProduct = () => {
        if (selectedProductId) {
            setModalType('Delete Product');
            const selectedProduct = selectedProductId ? productData.find((element) => element._id === selectedProductId[0]) : undefined;
            setModalFormData([
                {
                    message: `Are you sure you want to delete ${selectedProduct.name}?`,
                }
            ]);
            setIsModalVisible(true);
        }
    };

    const handleOk = () => {
        if (modalType) {
            if (modalType.includes('Add')) {
                console.log('Added Product!');
            } else if (modalType.includes('Edit')) {
                console.log('Edited Product!');
            } else if (modalType.includes('Delete')) {
                axios.delete(`http://localhost:4000/products/${selectedProductId}`)
                    .then((res) => {
                        if (res.status === 200) {
                            getProducts();
                        }
                        setIsLoading(false);
                    })
                    .catch((err) => {
                        setIsLoading(false);
                    });
                console.log('Deleted Product!');
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
            console.log(`selectedRowKey: ${selectedRowKey}`, 'selectedRows: ', selectedRow);
            setSelectedProductId(selectedRowKey);
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
                    <DataTable data={productData} columns={columns} rowSelection={rowSelection} />
                    <ActionButtons addAction={addProduct} editAction={editProduct} deleteAction={deleteProduct} />
                </>
            }
        </div>
    );
};

export default Products;