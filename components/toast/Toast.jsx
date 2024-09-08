// components/Toast.js
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import styles from './Toast.module.css';
import { toastAction } from '../redux/toast-slice';

const Toast = () => {
  const dispatch = useDispatch();
  const { toastMessage, isToastShow, toastType } = useSelector((state) => state.toast);

  useEffect(() => {
    if (isToastShow) {
      const timer = setTimeout(() => {
        dispatch(toastAction.closeNotification());
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isToastShow, dispatch]);

  if (!isToastShow) return null;

  return (
    <div className={`${styles.toastcontainer}`}>
      <div
        className={`shadow-md ${styles.toast} ${styles[toastType]} ${isToastShow ? styles.show : ''}`}
      >
        {toastType === 'failed' && (
          <p>
            <span className='text-[#F9A106] text-[20px] md:text-[26px]'>
              <i className="ri-error-warning-fill"></i>
            </span>
            <span className='pl-[10px] text-gray-900 text-[16px] md:text-[20px]'>{toastMessage}</span>
          </p>
        )}
        {toastType === 'done' && (
          <p>
            <span className='text-[#2bca0f99] text-[20px] md:text-[26px]'>
              <i className="ri-check-double-line"></i>
            </span>
            <span className='pl-[10px] text-gray-900 text-[16px] md:text-[20px]'>{toastMessage}</span>
          </p>
        )}
      </div>
    </div>
  );

};

export default Toast;
