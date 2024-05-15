const Notification = ({ message, type='confirm' }) => (
    //  type === confirm || alert
    <p className={`${type === 'confirm'? 'text-green-700': 'text-red-600' }`}>{message}</p>
  );
  
  export default Notification;
  