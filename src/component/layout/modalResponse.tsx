import React from 'react';
import Swal from 'sweetalert2';
interface Props {
  title: string;
  text: string;
  res: number;
}
const ModalResponse: React.FunctionComponent<Props> = (props) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'button green',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });
  enum response {
    'success',
    'warning',
    'error',
    'info',
    'question',
  }
  /*let resp: any = '';
  // let text = '';
  switch (props.res) {
    case 200:
      resp = response.success;
      break;
    case 202:
      resp = response.warning;
      break;
    default:
      resp = response.error;
      break;
  }*/
  swalWithBootstrapButtons.fire(props.title, props.text, 'error');

  return <div></div>;
};

export default ModalResponse;
