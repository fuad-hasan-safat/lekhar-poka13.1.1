import React, { useState } from 'react';
import ColorPicker from 'react-pick-color';

function MyAudioUploadForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState('#fff');

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
                    <label>writer</label>
                    <input type='text' placeholder='Enter writer' />
                </div>
            </div>
            <div className='audio__book__input__fields clearfix'>
                <div className='audio__book__input__field'>
                    <label>duration</label>
                    <input type='text' placeholder='Enter duration' />
                </div>
                <div className='audio__book__input__field'>
                    <label>voice</label>
                    <input type='text' placeholder='Enter voice' />
                </div>
            </div>
            <div className='audio__book__input__fields clearfix'>
                <div className='admin__input text-black'>
                    <label>Category</label>
                    <select
                        name="optons" id="options">
                        <option>select</option>
                    </select>
                </div>
                <div className='admin__input text-black'>
                    <label>Background</label>
                    <select
                        name="optons" id="options">
                        <option>background</option>
                        <option>No Background</option>
                    </select>
                </div>
            </div> 
            <div className='audio__book__input__fields clearfix'>
                <div className='admin__input text-black'>
                    <label>Category</label>
                    <select
                        name="optons" id="options">
                        <option>select</option>
                    </select>
                </div>
                <div className='admin__input text-black'>
                    <label>Background</label>
                    <select
                        name="optons" id="options">
                        <option>background</option>
                        <option>No Background</option>
                    </select>
                </div>
            </div>
            <div className='audio__book__input__fields clearfix'>
                <div className='admin__input'>
                  <ColorPicker color={color} onChange={color => setColor(color.hex)} />
                </div>
                <div className='admin__input'>
                    <label>summary</label>
                    <textarea type='text' placeholder='summary' />
                </div>
            </div>
            <div className='audio__book__input__fields clearfix'>
                <div className='admin__input'>
                    <label>info</label>
                    <textarea type='text' placeholder='info' />
                </div>
                <div className='admin__input'>
                    <label>message</label>
                    <textarea type='text' placeholder='message' />
                </div>
            </div>
        </form>
    </div>
  );
}

export default MyAudioUploadForm;