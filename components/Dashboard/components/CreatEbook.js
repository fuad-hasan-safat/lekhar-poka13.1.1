// import React from 'react';
// import Classes from './slider.module.css';

// const CreatEbook = () => {
//     console.log('Inside ebook')
//     return (
//         <div className="all__page__content__block clearfix">
//             <div className="all__post__list__wrap">
//                 <div className='audio__book__input__fields clearfix'>
//                     <div className='audio__book__input__field'>
//                         <label>Title</label>
//                         <input type='text' placeholder='Enter Text' />
//                     </div>
//                     <div className='audio__book__input__field'>

//                     </div>
//                 </div>
//             </div>
//       </div>
//     );
// };

// export default CreatEbook; 


import React, { useState } from 'react';

function MyAudioUploadForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    // Basic audio format validation (optional)
    if (!selectedFile.type.match('audio/*')) {
      setMessage('Please select an audio file.');
      return;
    }
    setFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(''); // Clear previous messages

    if (!file) {
      setMessage('Please select an audio file to upload.');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('audioFile', file);
    // Add any other form fields you need here (e.g., title, tags, etc.)

    try {
      const response = await fetch('/api/upload-audio', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setMessage(data.message); // Assuming the response has a message property
      setFile(null); // Clear selected file after successful upload
    } catch (error) {
      console.error(error);
      setMessage('Error uploading audio file!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='admin__add__slider__wrap'>
        <form onSubmit={handleSubmit}>
            <div className='audio__file__upload'>
                <input type="file" id="audioFileInput" onChange={handleChange} />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Uploading...' : 'Upload Audio'}
                </button>
                {message && <p>{message}</p>}
            </div>
            <div className='audio__book__input__fields clearfix'>
                <div className='audio__book__input__field'>
                    <label>Title</label>
                    <input type='text' placeholder='Enter Text' />
                </div>
                <div className='audio__book__input__field'>
                    <label>voice</label>
                    <input type='text' placeholder='Enter voice' />
                </div>
            </div>
            <div className='audio__book__input__fields clearfix'>
                <div className='admin__input'>
                    <label>Content</label>
                    <textarea type='text' value='' placeholder='Content' />
                </div>
                <div className='admin__input'>
                    <label>Caption</label>
                    <textarea type='text' value='' placeholder='Caption' />
                </div>
            </div>
        </form>
    </div>
  );
}

export default MyAudioUploadForm;