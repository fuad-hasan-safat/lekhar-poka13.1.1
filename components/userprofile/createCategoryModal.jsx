import { useState } from 'react';
import axios from 'axios';
import { apiBasePath } from '../../utils/constant';

const CreatecategoryModal = ({ showModal, handleClose, setIsCategoryAdded }) => {
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post(`${apiBasePath}/categories`, { title });
      setIsCategoryAdded(true)

      handleClose();

      //   if (response.status === 201) {
      //     console.log('Writer created successfully');
      //     handleClose(); // Close the modal if submit is successful
      //   } else {
      //     console.error('Failed to create writer');
      //   }
    } catch (error) {
      console.error('Error creating writer:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`${showModal ? 'block' : 'hidden'} fixed z-10 inset-0 overflow-y-auto flex items-center justify-center`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
              {/* Icon */}
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                নতুন লেখার ধরণ ক্রিয়েট করুন
              </h3>
              <div className="mt-2">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                      লেখার ধরণ
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="title"
                      type="text"
                      placeholder="লেখার ধরণ"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                      onClick={handleClose}
                      disabled={submitting}
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className={`${submitting ? 'bg-[#F9A106] cursor-not-allowed' : 'bg-[#F9A106] hover:bg-[#f98806]'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                      disabled={submitting}
                    >
                      {submitting ? 'সাবমিট হচ্ছে...' : 'সাবমিট'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default CreatecategoryModal;
