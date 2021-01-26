import { Button } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './ActionButtons.css';

const ActionButtons = (props) => {
    return (
        <div className="ButtonGroup">
            {props.addAction ?
                <Button type="primary" shape="round" icon={<PlusOutlined />} className="ActionButton" onClick={props.addAction}>Add</Button>
                :
                null
            }
            {props.editAction ?
                <Button type="primary" shape="round" icon={<EditOutlined />} className="ActionButton" onClick={props.editAction}>Edit</Button>
                :
                null
            }
            {props.deleteAction ?
                <Button danger type="primary" shape="round" icon={<DeleteOutlined />} className="ActionButton" onClick={props.deleteAction}>Delete</Button>
                :
                null
            }
        </div>
    );
};

export default ActionButtons;