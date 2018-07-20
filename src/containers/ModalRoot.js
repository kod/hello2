import React from 'react';
import { connect } from 'react-redux';
import { MODAL_TYPES } from '../common/constants';
import AddressAddModal from './AddressAddModal';

const MODAL_COMPONENTS = {
  [MODAL_TYPES.ADDRESSADD]: AddressAddModal,
};

const ModalRoot = ({ modal: { modalType, modalProps } }) => {
  if (!modalType) {
    return null;
  }
  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal {...modalProps} />;
};

export default connect(state => ({
  modal: state.modal,
}))(ModalRoot);
