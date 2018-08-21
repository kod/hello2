import React from 'react';
import { connect } from 'react-redux';
import { MODAL_TYPES } from '../common/constants';
import AddressAddModal from './AddressAddModal';
import ParamsSelectModal from './ParamsSelectModal';
import LoaderModal from './LoaderModal';
import ActionSheetModal from './ActionSheetModal';
import BillSelectModal from './BillSelectModal';
import EnterPasswordModal from './EnterPasswordModal';
import ShareModal from './ShareModal';

const MODAL_COMPONENTS = {
  [MODAL_TYPES.ADDRESSADD]: AddressAddModal,
  [MODAL_TYPES.PARAMSSELECT]: ParamsSelectModal,
  [MODAL_TYPES.LOADER]: LoaderModal,
  [MODAL_TYPES.ACTIONSHEET]: ActionSheetModal,
  [MODAL_TYPES.BILLSELECT]: BillSelectModal,
  [MODAL_TYPES.ENTERPASSWORD]: EnterPasswordModal,
  [MODAL_TYPES.SHARE]: ShareModal,
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
