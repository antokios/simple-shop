import { Modal } from 'antd';

const ActionModal = (props) => {
    console.log(props);

    return (
        <Modal title={props.modalTitle} visible={props.isVisible} onOk={props.okAction} onCancel={props.cancelAction}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    );
};

export default ActionModal;