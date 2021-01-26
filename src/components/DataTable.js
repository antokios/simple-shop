import { Table } from 'antd';
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
        </div>
    );
};

export default DataTable;