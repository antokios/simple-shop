import { Table, Button } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './DataTable.css';

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};

const DataTable = (props) => {
    return (
        <div className="Table">
            <Table
                rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                }}
                columns={props.columns}
                dataSource={props.data}
            />
            <div className="ButtonGroup">
                <Button type="primary" shape="round" icon={<PlusOutlined />} className="ActionButton" onClick={props.addAction}>Add</Button>
                <Button type="primary" shape="round" icon={<EditOutlined />} className="ActionButton" onClick={props.editAction}>Edit</Button>
                <Button danger type="primary" shape="round" icon={<DeleteOutlined />} className="ActionButton" onClick={props.deleteAction}>Delete</Button>
            </div>
        </div>
    );
};

export default DataTable;