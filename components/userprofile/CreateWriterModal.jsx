import { useState } from 'react';
import { apiBasePath } from '../../utils/constant';

const CreateWriterModal = ({ showModal, handleClose }) => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [deathDate, setDeathDate] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('birth_date', birthDate);
    formData.append('expiry_date', deathDate);
    formData.append('file', image);

    try {
      const response = await fetch(`${apiBasePath}/writers`, {
        method: 'POST',
        body: formData
      });

      handleClose();

      // if (response.ok) {
      //   console.log('Writer created successfully');
      //   handleClose();
      // } else {
      //   console.error('Failed to create writer');
      // }
    } catch (error) {
      console.error('Error creating writer:', error);
    }
  };

  return (
    <div className={`${showModal ? 'block' : 'hidden'} fixed z-10 inset-0 overflow-y-auto`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                {/* Icon */}
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  নতুন রাইটার ক্রিয়েট করুন
                </h3>
                <div className="mt-2">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        নাম
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="নাম"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birthDate">
                        জন্ম তারিখ
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="birthDate"
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deathDate">
                        মৃত্যু তারিখ
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="deathDate"
                        type="date"
                        value={deathDate}
                        onChange={(e) => setDeathDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        ছবি আপলোড করুন
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                      />
                    </div>
                    <div className="flex items-center justify-end">
                      <button
                        type="button"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                        onClick={handleClose}
                      >
                        বাতিল
                      </button>
                      <button
                        type="submit"
                        className="bg-[#F9A106] hover:bg-[#f98806] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        সাবমিট
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWriterModal;
