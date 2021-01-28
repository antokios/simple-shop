import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spin, Space, Modal, Input } from 'antd';
import DataTable from '../components/DataTable';
import ActionButtons from '../components/ActionButtons';

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
    const [modalType, setModalType] = useState(undefined);
    const [selectedProductId, setSelectedProductId] = useState(undefined);
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductDescription, setNewProductDescription] = useState('');
    const [newProductImageURL, setNewProductImageURL] = useState('');
    const [newProductStockQuantity, setNewProductStockQuantity] = useState('');

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        setIsLoading(true);
        axios.get('https://node-simple-shop.herokuapp.com/products/')
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
        setIsModalVisible(true);
    };

    const editProduct = () => {
        if (selectedProductId) {
            const selectedProduct = selectedProductId ? productData.find((element) => element._id === selectedProductId[0]) : undefined;
            setModalType('Edit Product');
            setNewProductName('' + selectedProduct.name);
            setNewProductPrice('' + selectedProduct.price);
            setNewProductDescription('' + selectedProduct.description);
            setNewProductImageURL('' + selectedProduct.imageUrl);
            setNewProductStockQuantity('' + selectedProduct.stockQty);
            setIsModalVisible(true);
        }
    };

    const deleteProduct = () => {
        if (selectedProductId) {
            setModalType('Delete Product');
            setIsModalVisible(true);
        }
    };

    const handleOk = () => {
        if (modalType) {
            if (modalType.includes('Add')) {
                setIsLoading(true);
                if (newProductName?.length > 0 && newProductPrice?.length > 0 && newProductDescription?.length > 0 && newProductImageURL?.length > 0 && newProductStockQuantity?.length > 0) {
                    axios.post(`https://node-simple-shop.herokuapp.com/products/`, {
                        name: newProductName,
                        price: Number(newProductPrice),
                        description: newProductDescription,
                        imageUrl: newProductImageURL,
                        stockQty: Number(newProductStockQuantity)
                    })
                        .then((res) => {
                            setTimeout(() => {
                                getProducts();
                            }, 100);
                        })
                        .catch((err) => {
                            setIsLoading(false);
                        });
                }
            } else if (modalType.includes('Edit')) {
                if (newProductName?.length > 0 && newProductPrice?.length > 0 && newProductDescription?.length > 0 && newProductImageURL?.length > 0 && newProductStockQuantity?.length > 0) {
                    axios.put(`https://node-simple-shop.herokuapp.com/products/${selectedProductId}`, {
                        name: newProductName,
                        price: Number(newProductPrice),
                        description: newProductDescription,
                        imageUrl: newProductImageURL,
                        stockQty: Number(newProductStockQuantity)
                    })
                        .then((res) => {
                            setTimeout(() => {
                                getProducts();
                            }, 100);
                        })
                        .catch((err) => {
                            setIsLoading(false);
                        });
                }
            } else if (modalType.includes('Delete')) {
                axios.delete(`https://node-simple-shop.herokuapp.com/products/${selectedProductId}`)
                    .then((res) => {
                        setTimeout(() => {
                            getProducts();
                        }, 100);
                    })
                    .catch((err) => {
                        setIsLoading(false);
                    });
            }
        }
        setIsModalVisible(false);
        setModalType(undefined);
        setSelectedProductId(undefined);
        setNewProductName('');
        setNewProductDescription('');
        setNewProductPrice('');
        setNewProductImageURL('');
        setNewProductStockQuantity('');
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setModalType(undefined);
        setSelectedProductId(undefined);
        setNewProductName('');
        setNewProductDescription('');
        setNewProductPrice('');
        setNewProductImageURL('');
        setNewProductStockQuantity('');
    };

    const rowSelection = {
        onChange: (selectedRowKey, selectedRow) => {
            setSelectedProductId(selectedRowKey);
        },
    };

    const onNameChange = (e) => {
        const { value } = e.target;
        setNewProductName(value?.trim());
    };

    const onDescriptionChange = (e) => {
        const { value } = e.target;
        setNewProductDescription(value?.trim());
    };

    const onPriceChange = (e) => {
        const { value } = e.target;
        setNewProductPrice('' + value?.trim());
    };

    const onImageURLChange = (e) => {
        const { value } = e.target;
        setNewProductImageURL(value?.trim());
    };

    const onStockQuantityChange = (e) => {
        const { value } = e.target;
        setNewProductStockQuantity('' + value?.trim());
    };

    const renderModal = () => {
        if (modalType && isModalVisible) {
            if (modalType.includes('Add')) {

                return (
                    <Modal title={modalType} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <Input placeholder={'Name'} onChange={onNameChange} />
                        <p />
                        <Input placeholder={'Price'} onChange={onPriceChange} />
                        <p />
                        <Input placeholder={'Description'} onChange={onDescriptionChange} />
                        <p />
                        <Input placeholder={'Image URL'} onChange={onImageURLChange} />
                        <p />
                        <Input placeholder={'Stock Quantity'} onChange={onStockQuantityChange} />
                    </Modal>
                );
            } else if (modalType.includes('Edit')) {
                const selectedProduct = selectedProductId ? productData.find((element) => element._id === selectedProductId[0]) : undefined;
                return (
                    <Modal title={modalType} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <Input placeholder={'Name'} defaultValue={selectedProduct.name} onChange={onNameChange} />
                        <p />
                        <Input placeholder={'Price'} defaultValue={selectedProduct.price} onChange={onPriceChange} />
                        <p />
                        <Input placeholder={'Description'} defaultValue={selectedProduct.description} onChange={onDescriptionChange} />
                        <p />
                        <Input placeholder={'Image URL'} defaultValue={selectedProduct.imageUrl} onChange={onImageURLChange} />
                        <p />
                        <Input placeholder={'Stock Quantity'} defaultValue={selectedProduct.stockQty} onChange={onStockQuantityChange} />
                    </Modal>
                );
            } else if (modalType.includes('Delete')) {
                const selectedProduct = selectedProductId ? productData.find((element) => element._id === selectedProductId[0]) : undefined;
                return (
                    <Modal title={modalType} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <p>{`Are you sure you want to delete ${selectedProduct.name}?`}</p>
                    </Modal>
                );
            }
        } else {
            return null;
        }
    };

    return (
        <div>
            {isLoading ?
                <Space size="middle">
                    <Spin size="large" />
                </Space>
                :
                <>
                    {renderModal()}
                    <DataTable data={productData} columns={columns} rowSelection={rowSelection} />
                    <ActionButtons addAction={addProduct} editAction={editProduct} deleteAction={deleteProduct} />
                </>
            }
        </div>
    );
};

export default Products;